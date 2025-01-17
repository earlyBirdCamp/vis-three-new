import path from "path";
import { defineConfig } from "vite";
import visualizer from "rollup-plugin-visualizer";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "/vis-three/",
  server: {
    open: "src/index.html",
  },
  build: {
    outDir: path.resolve(__dirname, "../../docs"),
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "./index.html"),
        examples: path.resolve(__dirname, "./examples.html"),
      },
      output: {
        manualChunks: {
          three: ["three"],
          "vis-three": ["vis-three"],
          Antd: ["ant-design-vue"],
        },
      },
    },
  },
  plugins: [
    vue(),
    visualizer({
      open: true,
    }),
  ],
});
