const sassPlugin = require("esbuild-plugin-sass");
const autoprefixer = require("autoprefixer");
const postCssPlugin = require("@deanc/esbuild-plugin-postcss");
require("esbuild")
  .serve(
    { port: 8000, servedir: "." },
    {
      entryPoints: ["index.ts", "app.tsx"],
      bundle: true,
      tsconfig: "tsconfig.json",
      outdir: "out",
      loader: { ".js": "jsx" },
      plugins: [sassPlugin()],
    }
  )
  .then((server: { [key: string]: string }) => {
    console.log(server);
  });
