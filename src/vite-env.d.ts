/// <reference types="vite/client" />

interface Window {
  DEBUG_MODE?: boolean;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string; };
  export default classes;
}
