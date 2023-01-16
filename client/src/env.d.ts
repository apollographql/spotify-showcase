interface ImportMetaEnv {
  readonly VITE_SERVER_HOST: string;
  readonly VITE_WEBSOCKET_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
