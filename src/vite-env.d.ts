/// <reference types="vite/client" />

interface Window {
  DEBUG_MODE?: boolean;
}

interface ImportMetaEnv {
  readonly VITE_DEBUG_MODE?: string;
  readonly VITE_ANIMATION_SPEED?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string; };
  export default classes;
}

