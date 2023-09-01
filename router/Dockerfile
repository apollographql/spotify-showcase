FROM ghcr.io/apollographql/router:v1.28.1

COPY router.yaml /config.yaml
COPY rhai /dist/rhai

CMD ["--config", "/config.yaml"]
