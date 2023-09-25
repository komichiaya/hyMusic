/// <reference types="vite/client" />
declare module "bili-api";
declare module "lyric-parser";
declare module "'@vueuse/core";
declare module "vue-concise-slider";
declare module "animation.js";

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
