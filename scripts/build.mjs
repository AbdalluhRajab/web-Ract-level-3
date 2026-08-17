import { transformAsync } from "@babel/core";
import transformReactJsx from "@babel/plugin-transform-react-jsx";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { rollup } from "rollup";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outputDirectory = path.join(root, "dist");

const jsxPlugin = {
  name: "stockflow-jsx",
  async transform(code, id) {
    if (!/\.[jt]sx$/.test(id)) return null;
    const result = await transformAsync(code, {
      filename: id,
      plugins: [[transformReactJsx, { runtime: "automatic" }]],
      sourceMaps: true,
    });
    return { code: result.code, map: result.map };
  },
};

const cssPlugin = {
  name: "stockflow-css",
  load(id) {
    if (id.endsWith(".css")) return "export default {};";
    return null;
  },
};

const productionEnvironmentPlugin = {
  name: "stockflow-production-environment",
  transform(code) {
    if (!code.includes("process.env.NODE_ENV")) return null;
    return { code: code.replaceAll("process.env.NODE_ENV", JSON.stringify("production")), map: null };
  },
};

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(path.join(outputDirectory, "assets"), { recursive: true });

const bundle = await rollup({
  input: path.join(root, "src", "main.jsx"),
  plugins: [nodeResolve({ browser: true, extensions: [".mjs", ".js", ".json", ".node", ".jsx"] }), productionEnvironmentPlugin, commonjs(), jsxPlugin, cssPlugin],
  onwarn(warning, warn) {
    if (warning.code !== "MODULE_LEVEL_DIRECTIVE") warn(warning);
  },
});

await bundle.write({
  dir: outputDirectory,
  format: "es",
  sourcemap: true,
  entryFileNames: "assets/main.js",
  chunkFileNames: "assets/[name]-[hash].js",
});
await bundle.close();

await cp(path.join(root, "src", "styles.css"), path.join(outputDirectory, "styles.css"));
const sourceHtml = await readFile(path.join(root, "index.html"), "utf8");
const outputHtml = sourceHtml
  .replace("<script type=\"module\" src=\"/src/main.jsx\"></script>", "<link rel=\"stylesheet\" href=\"/styles.css\" />\n    <script type=\"module\" src=\"/assets/main.js\"></script>");
await writeFile(path.join(outputDirectory, "index.html"), outputHtml);

console.log("StockFlow production bundle written to dist/.");
