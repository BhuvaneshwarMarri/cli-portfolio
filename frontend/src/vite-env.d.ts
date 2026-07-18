interface ImportMetaEnv {
  // Add your custom env variables here for TypeScript autocomplete
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}