/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_DEFAULT_TARGET_SYSTOLIC: string;
  readonly VITE_DEFAULT_TARGET_DIASTOLIC: string;
  readonly VITE_ENABLE_DEMO_SEED: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
