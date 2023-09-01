fn supergraph_service(service) {
    service
      .map_request(log_payload);
    service
      .map_request(add_auth_header_to_context);
};
  
fn log_payload(request) {
    request.context["apollo_telemetry::logging::display_body"] = true;
    request.context["apollo_telemetry::logging::display_headers"] = true;
    return request;
};


fn add_auth_header_to_context(request) {
    if "authorization" in request.headers {
        request.context["auth_header"] = request.headers["authorization"];
    }
    return request;
};

fn subgraph_service(service, service_name) {
    service.map_request(add_auth_header);
    service.map_response(|response| log_response(service_name, response));
}

fn log_response(service_name, response) {
    return response;
}

fn add_auth_header(request) {
    if !request.context["auth_header"].is_empty() {
        request.subgraph.headers["authorization"] = request.context["auth_header"];
    }
    return request;
}
