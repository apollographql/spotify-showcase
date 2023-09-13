FROM node:20

WORKDIR /app

# We copy the 'shared' folder
COPY shared shared

RUN mkdir -p subgraphs/playback/

# We copy the relevant files for our subgraph
COPY subgraphs/playback/package.json subgraphs/playback/schema.graphql subgraphs/playback/tsconfig.json subgraphs/playback/
COPY subgraphs/playback/src subgraphs/playback/src/
COPY package.json package-lock.json tsconfig.json ./

# This runs the npm install on the root so workspaces work
RUN npm install

WORKDIR /app/subgraphs/playback
RUN npm run build

EXPOSE 4002

CMD ["node", "dist/index.js"]