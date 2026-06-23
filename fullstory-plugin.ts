import type { Plugin } from 'vite';

export function fullStoryPlugin(): Plugin {
  return {
    name: 'fullstory',
    configureServer() {
      // FullStory plugin
    }
  };
}
