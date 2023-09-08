FROM node:alpine

WORKDIR /app

# We copy then entire monorepo because we have the 'shared' folder for our subgraphs
COPY . .

# Remove unnecessary folders from WORKDIR
RUN rm -rf ./client
RUN rm -rf ./scripts
RUN rm -rf ./router
RUN rm -rf ./docs
RUN rm -rf ./subgraphs/playback

# This runs the npm install on the root so workspaces work
RUN npm install
RUN npm run build

EXPOSE ${PORT:-4001}

CMD ["node", "subgraphs/spotify/dist/index.js"]