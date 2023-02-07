interface ImportMetaEnv {
  readonly VITE_SERVER_HOST: string;
  readonly VITE_WEBSOCKET_HOST: string;
  readonly VITE_SPOTIFY_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
