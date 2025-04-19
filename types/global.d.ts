export {};

declare global {
  interface Window {
    gtag: (command: string, id: string, params?: Record<string, any>) => void;
  }
}