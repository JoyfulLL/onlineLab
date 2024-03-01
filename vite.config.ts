import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import { fileURLToPath, URL } from "node:url"
import path from "path"
import AutoImport from "unplugin-auto-import/vite"
import IconsResolver from "unplugin-icons/resolver"
import Icons from "unplugin-icons/vite"
import Components from "unplugin-vue-components/vite"
import {
  AntDesignVueResolver,
  ElementPlusResolver,
} from "unplugin-vue-components/resolvers"
import viteCompression from "vite-plugin-compression"
import Inspect from "vite-plugin-inspect"

const pathSrc = path.resolve(__dirname, "src")
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    viteCompression(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue"],

      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),

        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: "Icon",
        }),
      ],
      eslintrc: {
        enabled: false, // Default `false`
        filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      dts: path.resolve(pathSrc, "auto-imports.d.ts"),
    }),

    Components({
      resolvers: [
        // Auto register icon components

        IconsResolver({
          enabledCollections: ["ep"],
        }),
        // Auto register Element Plus components
        ElementPlusResolver(),
        // Auto register AntDesign components
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],

      dts: path.resolve(pathSrc, "components.d.ts"),
    }),

    Icons({
      autoInstall: true,
    }),

    Inspect(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
