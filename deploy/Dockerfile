FROM alpine
COPY bin/backend /backend/server
COPY src/me/backend/data /backend/data
COPY src/me/frontend /frontend
EXPOSE 8080
RUN chmod 755 /backend/server
ENTRYPOINT ["/backend/server"]