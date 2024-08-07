import { builtinModules } from "node:module";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const external = [...builtinModules, ...builtinModules.map((m) => `node:${m}`)];

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      fileName: "index",
      name: "CustomDzLodash",
      formats: ["es", "cjs", "umd"],
    },
    sourcemap: true,
    minify: false,
    rollupOptions: {
      external,
      output: {
        inlineDynamicImports: true,
        exports: "named",
      },
      preserveSymlinks: true,
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true, // 可选：在 package.json 中插入 types 字段
    }),
  ],
});
