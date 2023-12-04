FROM ghcr.io/apollographql/router:v1.35.0

COPY ./entrypoint.sh ./entrypoint.sh
COPY ./wait-for-it.sh ./wait-for-it.sh

USER root

RUN chmod +x ./wait-for-it.sh && \
    chmod +x ./entrypoint.sh

USER router

COPY rhai /dist/rhai
COPY router.yaml /dist/router.yaml

ENTRYPOINT [ "./entrypoint.sh" ]
