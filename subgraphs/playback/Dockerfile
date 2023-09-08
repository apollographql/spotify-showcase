FROM node:20

WORKDIR /app

# We copy then entire monorepo because we have the 'shared' folder for our subgraphs
COPY . .

# Remove unnecessary folders from WORKDIR
RUN rm -rf ./client
RUN rm -rf ./scripts
RUN rm -rf ./router
RUN rm -rf ./docs
RUN rm -rf ./subgraphs/spotify

# This runs the npm install on the root so workspaces work
RUN npm install
RUN npm run build

EXPOSE ${PORT:-4002}

CMD ["node", "subgraphs/playback/dist/index.js"]