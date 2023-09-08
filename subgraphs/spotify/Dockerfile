FROM node:20

WORKDIR /app

# We copy the 'shared' folder
COPY shared shared

RUN mkdir -p subgraphs/spotify/

# We copy the relevant files for our subgraph
COPY subgraphs/spotify/package.json subgraphs/spotify/schema.graphql subgraphs/spotify/tsconfig.json subgraphs/spotify/
COPY subgraphs/spotify/src subgraphs/spotify/src/
COPY package.json package-lock.json tsconfig.json ./

# This runs the npm install on the root so workspaces work
RUN npm install

WORKDIR /app/subgraphs/spotify
RUN npm run build

EXPOSE 4002

CMD ["node", "dist/index.js"]