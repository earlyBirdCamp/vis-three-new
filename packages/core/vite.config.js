import path from "path";
import pkg from "./package.json";
export default {
  build: {
    lib: {
      entry: path.resolve(__dirname, "./main.ts"),
      name: "VIS.core",
    },
    rollupOptions: {
      output: {
        chunkFileNames: "[name]-[hash].js",
        entryFileNames: "VIS.core.[format].js",
        assetFileNames: "static/[name]-[hash].[ext]",
      },
      external: [
        ...Object.keys(pkg.dependencies),
        "three/src/lights/LightShadow",
        new RegExp("^three/examples/jsm"),
      ],
      plugins: [],
    },
  },
};