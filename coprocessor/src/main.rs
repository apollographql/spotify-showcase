mod graceful_shutdown;

use std::collections::HashMap;

use axum::{extract::State, routing::post, Json, Router};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use tower_http::trace::{TraceLayer};

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let app = Router::new()
        .route("/", post(handler))
        .with_state(Client::new())
        .layer(
            TraceLayer::new_for_http()
        );

    axum::Server::bind(&"0.0.0.0:4100".parse().unwrap())
        .serve(app.into_make_service())
        .with_graceful_shutdown(graceful_shutdown::graceful_shutdown())
        .await
        .unwrap();
}

async fn handler(
    State(client): State<Client>,
    Json(mut data): Json<CoprocessorData>,
) -> Json<CoprocessorData> {
    if let Some(token) = data.headers.get("authorization").and_then(|v| v.get(0)) {
        if let Some(SpotifyProfile{product, country, email}) = get_spotify_profile(client, token).await {
            let email = data.headers.get("email").and_then(|v| v.get(0).cloned()).unwrap_or(email);
            let apollo = if email.ends_with("@apollographql.com") {
                "apollo:employee"
            } else { "" };
            let country = data.headers.get("country").and_then(|v| v.get(0).cloned()).unwrap_or(country);
            let scope = format!("spotify:{product} country:{country} {apollo}");
            tracing::info!("Token was valid, scope: {scope}");
            data.context.entries.insert(
                CLAIMS_KEY.to_string(),
                serde_json::to_value(Claims { scope })
                .unwrap(),
            );
        } else {
            tracing::warn!("Token was invalid");
        }
    } else {
        tracing::info!("No authorization header found");
    }
    tracing::debug!("Responding with {:?}", data);
    Json(data)
}

#[derive(Clone, Debug, Deserialize, Serialize)]
struct CoprocessorData {
    version: usize,
    stage: String,
    control: String,
    id: String,
    context: Context,
    headers: HashMap<String, Vec<String>>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
struct Context {
    entries: HashMap<String, Value>,
}

const CLAIMS_KEY: &str = "apollo_authentication::JWT::claims";

#[derive(Clone, Debug, Serialize)]
struct Claims {
    scope: String,
}

async fn get_spotify_profile(client: Client, token: &str) -> Option<SpotifyProfile> {
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
