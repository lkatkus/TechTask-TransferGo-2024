import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ rollupTypes: true, tsconfigPath: "./tsconfig.app.json" }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      formats: ["es"],
      fileName: () => `index.js`,
    },
  },
});
