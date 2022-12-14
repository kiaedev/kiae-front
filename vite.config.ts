import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import path, { dirname, resolve } from "path";
const pathSrc = resolve(__dirname, "src");

const backend = {
  target: "http://localhost:8081/",
  changeOrigin: false,
  ws: true,
};

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@/": `${pathSrc}/`,
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
  server: {
    proxy: {
      "/api": backend,
      "/oauth2": backend,
      "/provider": backend,
      "/proxies": backend,
    },
  },
  build: {
    target: ["edge90", "chrome90", "firefox90", "safari15"],
  },
  plugins: [
    vue(),
    VueI18nPlugin({
      /* options */
      // locale messages resource pre-compile option
      include: path.resolve(__dirname, "./src/locales/**"),
    }),
    viteCommonjs(),
    Components({
      dts: "src/components.d.ts",
      types: [
        {
          from: "vue-router",
          names: ["RouterLink", "RouterView"],
        },
      ],
      // allow auto load markdown components under `./src/components/`
      extensions: ["vue", "md"],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        AntDesignVueResolver({
          resolveIcons: true,
        }),
      ],
    }),
  ],
});
