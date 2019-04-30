import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import replace from "rollup-plugin-replace";
import svg from "rollup-plugin-svg";
import typescript from "rollup-plugin-typescript2";

import {
  preprocess,
  createEnv,
  readConfigFile
} from "@pyoner/svelte-ts-preprocess";

import * as GlobalEnvs from "./src/env_vars";

const production = !process.env.ROLLUP_WATCH;

const env = createEnv();
const compilerOptions = readConfigFile(env);
const opts = {
  env,
  compilerOptions: {
    ...compilerOptions,
    allowNonTsExtensions: true
  }
};

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/bundle.js"
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write("public/bundle.css");
      },
      preprocess: preprocess(opts)
    }),
    svg(),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve(),
    commonjs(),
    typescript(),

    replace({
      include: "src/env_vars.js",
      exclude: "node_modules/**",
      delimiters: ["<% ", " %>"],
      values: Object.keys(GlobalEnvs).reduce(
        (acc, envKey) => ({ ...acc, [envKey]: process.env[envKey] }),
        {}
      )
    }),
    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
