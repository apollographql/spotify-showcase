mod graceful_shutdown;

use std::collections::HashMap;

use axum::{extract::State, routing::post, Json, Router};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use tower_http::trace::TraceLayer;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let app = Router::new()
        .route("/", post(handler))
        .with_state(Client::new())
        .layer(TraceLayer::new_for_http());

    axum::Server::bind(&"0.0.0.0:4100".parse().unwrap())
        .serve(app.into_make_service())
        .with_graceful_shutdown(graceful_shutdown::graceful_shutdown())
        .await
        .unwrap();
}

async fn handler(
    State(client): State<Client>,
    Json(data): Json<CoprocessorData>,
) -> Json<CoprocessorData> {
    Json(match &data.stage {
        Stage::RouterRequest => handle_router_request(client, data).await,
        Stage::SupergraphRequest => handle_supergraph_request(client, data).await,
        Stage::Other(_) => data,
    })
}

async fn handle_router_request(client: Client, mut data: CoprocessorData) -> CoprocessorData {
    if let Some(token) = data.headers.get("authorization").and_then(|v| v.get(0)) {
        if let Some(SpotifyProfile {
                        product,
                        country,
                        email,
                    }) = get_spotify_profile(client, token).await
        {
            let email = data
                .headers
                .get("email")
                .and_then(|v| v.get(0).cloned())
                .unwrap_or(email);
            let apollo = if email.ends_with("@apollographql.com") {
                "apollo:employee"
            } else {
                ""
            };
            let country = data
                .headers
                .get("country")
                .and_then(|v| v.get(0).cloned())
                .unwrap_or(country);
            let scope = format!("spotify:{product} country:{country} {apollo}");
            tracing::info!("Token was valid, scope: {scope}");
            data.context.entries.set_claims(Claims { scope });
        } else {
            tracing::warn!("Token was invalid");
        }
    } else {
        tracing::info!("No authorization header found");
    }
    tracing::debug!("Responding with {:?}", data);
    data
}

async fn handle_supergraph_request(
    client: Client,
    mut data: CoprocessorData,
) -> CoprocessorData {
    let requested_policies = data.context.entries.get_policies();
    if requested_policies.is_empty() {
        tracing::info!("No policies requested");
        return data;
    }
    let Some(token) = data.headers.get("authorization").and_then(|v| v.get(0)) else {
        tracing::warn!("No authorization header found");
        return data;
    };
    let Some(SpotifyProfile {
                 product,
                 country,
                 email,
             }) = get_spotify_profile(client, token).await else {
        tracing::warn!("Token was invalid");
        return data;
    };

    let email = data
        .headers
        .get("email")
        .and_then(|v| v.get(0).cloned())
        .unwrap_or(email);
    let country = data
        .headers
        .get("country")
        .and_then(|v| v.get(0).cloned())
        .unwrap_or(country);

    let processed_policies = requested_policies.into_keys().map(|policy| {
        let value = match &policy {
            Policy::Authenticated => Some(true),
            Policy::SpotifyPremium => Some(product == "premium"),
            Policy::CountryUS => {
                Some(country == "US")
            },
            Policy::ApolloEmployee => {
                Some(email.ends_with("@apollographql.com"))
            },
            Policy::Unknown(unknown) => {
                tracing::error!("Unknown policy: {unknown}");
                None
            },
        };
        (policy, value)
    }).collect();

    data.context.entries.set_policies(processed_policies);
    data
}

#[derive(Clone, Debug, Deserialize, Serialize)]
struct CoprocessorData {
    version: usize,
    stage: Stage,
    control: String,
    id: String,
    context: Context,
    headers: HashMap<String, Vec<String>>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
enum Stage {
    RouterRequest,
    SupergraphRequest,
    Other(String),
}

#[derive(Clone, Debug, Deserialize, Serialize)]
struct Context {
    entries: Entries,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
struct Entries(HashMap<String, Value>);

impl Entries {
    const CLAIMS_KEY: &'static str = "apollo_authentication::JWT::claims";
    const POLICIES_KEY: &'static str = "apollo_authorization::policies::required";

    fn set_claims(&mut self, claims: Claims) {
        self.0.insert(
            Self::CLAIMS_KEY.to_string(),
            serde_json::to_value(claims).unwrap(),
        );
    }

    fn get_policies(&self) -> HashMap<Policy, Option<bool>> {
        self.0.get(Self::POLICIES_KEY).and_then(|value| serde_json::from_value(value.clone()).ok()).unwrap_or_default()
    }

    fn set_policies(&mut self, policies: HashMap<Policy, Option<bool>>) {
        self.0.insert(
            Self::POLICIES_KEY.to_string(),
            serde_json::to_value(policies).unwrap(),
        );
    }
}

#[derive(Clone, Debug, Deserialize, Eq, Hash, PartialEq, Serialize)]
enum Policy {
    #[serde(rename = "authenticated")]
    Authenticated,
    #[serde(rename = "spotify:premium")]
    SpotifyPremium,
    #[serde(rename = "country:US")]
    CountryUS,
    #[serde(rename = "apollo:employee")]
    ApolloEmployee,
    Unknown(String),
}

#[derive(Clone, Debug, Serialize)]
struct Claims {
    scope: String,
}

async fn get_spotify_profile(client: Client, token: &str) -> Option<SpotifyProfile> {
    tracing::warn!("Hitting Spotify's API");
    client
        .get("https://api.spotify.com/v1/me")
        .header("Authorization", format!("Bearer {token}"))
        .send()
        .await
        .ok()?
        .json::<SpotifyProfile>()
        .await
        .ok()
}

#[derive(Debug, Deserialize)]
struct SpotifyProfile {
    product: String,
    country: String,
    email: String,
}
