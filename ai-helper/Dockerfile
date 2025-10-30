FROM node:20-alpine

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm ci
RUN npm install --save-dev @types/express @types/body-parser

COPY src ./src

# Compila direto dentro do mesmo container
RUN npx tsc

EXPOSE 4005
CMD ["node", "dist/src/controller.ts"]