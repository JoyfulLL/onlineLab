import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import path from "path"
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
    test: {
       environment: "jsdom",
    transformMode: {
      web: [/.[tj]sx?$/],
    },
    deps: {
      inline: [/element-plus/],
    },
       exclude: [...configDefaults.exclude, 'e2e/*'],
       root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
)
