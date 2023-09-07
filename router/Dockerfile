FROM ghcr.io/apollographql/router:v1.23.0

COPY router.yaml /config.yaml
COPY rhai /dist/rhai

CMD ["--config", "/config.yaml"]
