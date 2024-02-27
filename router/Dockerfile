FROM ghcr.io/apollographql/router:v1.40.1
COPY router.yaml /dist/router.yaml
COPY rhai /dist/rhai

COPY ./entrypoint.sh ./entrypoint.sh
COPY ./wait-for-it.sh ./wait-for-it.sh

ENTRYPOINT [ "./entrypoint.sh" ]
