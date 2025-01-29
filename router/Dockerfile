FROM ghcr.io/apollographql/router:v2.0.0-preview.4
COPY router.yaml /dist/router.yaml
COPY rhai /dist/rhai

COPY ./entrypoint.sh ./entrypoint.sh
COPY ./wait-for-it.sh ./wait-for-it.sh

ENTRYPOINT [ "./entrypoint.sh" ]
