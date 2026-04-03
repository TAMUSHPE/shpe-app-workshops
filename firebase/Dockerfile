# Firebase Emulator Suite (Firestore + Auth + UI) for local workshop use.
# Run with docker compose from this directory; connect from the host at localhost on mapped ports.
#
# firebase-tools requires Java 21+ for the Firestore emulator (Java 17 is rejected).

FROM eclipse-temurin:21-jre-jammy

USER root

# Node.js 22 (firebase CLI + workshop scripts on the host still use local Node; this is for the container only)
RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates curl gnupg \
    && mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_22.x nodistro main" > /etc/apt/sources.list.d/nodesource.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g firebase-tools@latest

WORKDIR /workspace

COPY firebase.json .firebaserc ./

EXPOSE 4000 4400 4500 8080 9099

# Listen address is set in firebase.json (`host: 0.0.0.0`) so the host machine can reach mapped ports.
CMD ["firebase", "emulators:start", "--project", "tamushpemobileapp", "--only", "firestore,auth,ui"]
