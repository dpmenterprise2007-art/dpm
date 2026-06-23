import type { Plugin } from 'vite';

export function devToolsPlugin(): Plugin {
  return {
    name: 'dev-tools',
    configureServer() {
      // Development tools plugin
    }
  };
}
