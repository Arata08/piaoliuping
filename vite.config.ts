import { defineConfig } from "vite";
import UniApp from "@dcloudio/vite-plugin-uni";
import UniComponents from "@uni-helper/vite-plugin-uni-components";
import { NutResolver } from "nutui-uniapp";

export default defineConfig({
  // ...
  plugins: [
    // ...
    // 确保放在 `UniApp()` 之前
    UniComponents({
      resolvers: [
        NutResolver()
      ]
    }),
    UniApp()
  ]
});