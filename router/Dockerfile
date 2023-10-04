FROM ghcr.io/apollographql/router:v1.31.0
COPY router.yaml /dist/router.yaml
COPY rhai /dist/rhai

COPY ./entrypoint.sh ./entrypoint.sh
COPY ./wait-for-it.sh ./wait-for-it.sh
# better safe than sorry
RUN chmod +x ./wait-for-it.sh && \
    chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]
