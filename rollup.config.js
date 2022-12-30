import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";
import path from "path";
import fs from "fs";

function copyFiles(from, to, name = null, overwrite = false) {
  return {
    name: "copy-files",
    generateBundle() {
      const log = (msg) => console.log("\x1b[36m%s\x1b[0m", msg);
      log(`copy files: ${from} → ${to}`);
      fs.readdirSync(from).forEach((file) => {
        if (name === null) {
          const fromFile = `${from}/${file}`;
          const toFile = `${to}/${file}`;
          if (!fs.existsSync(to)) {
            fs.mkdirSync(to, { recursive: true });
          }
          if (fs.existsSync(toFile) && !overwrite) return;
          log(`• ${fromFile} → ${toFile}`);
          fs.copyFileSync(path.resolve(fromFile), path.resolve(toFile));
          return;
        }
        if (name === file) {
          const fromFile = `${from}/${file}`;
          const toFile = `${to}/${file}`;
          if (!fs.existsSync(to)) {
            fs.mkdirSync(to, { recursive: true });
          }
          if (fs.existsSync(toFile) && !overwrite) return;
          log(`• ${fromFile} → ${toFile}`);
          fs.copyFileSync(path.resolve(fromFile), path.resolve(toFile));
        }
      });
    },
  };
}

export default {
  input: "src/index.ts",
  output: [
    {
      file: "./lib/cjs/index.js",
      format: "cjs",
    },
    {
      file: "./lib/esm/index.js",
      format: "es",
    },
  ],
  external: [...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      typescript: require("typescript"),
    }),
    copyFiles("./src", "./lib/cjs", "ima.d.ts", true),
    copyFiles("./src", "./lib/esm", "ima.d.ts", true),
  ],
};
