import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import { resolve } from "path";

// https://vitejs.dev/config/
const pathSrc = resolve(__dirname, "src");
export default defineConfig({
  plugins: [
    vue(),
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

      dts: resolve(pathSrc, "auto-imports.d.ts"),
    }),

    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ["ep"],
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
      ],

      dts: resolve(pathSrc, "components.d.ts"),
    }),

    Icons({
      autoInstall: true,
    }),
  ],
  define: {
    "process.env": {},
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src/"),
    },
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      "/music": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/music/, ""),
      },
      "/demo": {
        target: "http://10.110.2.15",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/demo/, ""),
      },
      "/login": {
        target: "http://125.88.59.131:10001",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/login/, ""),
      },
    },
  },
});
