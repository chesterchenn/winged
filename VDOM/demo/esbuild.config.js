const esbuild = require('esbuild');
const alias = require('esbuild-plugin-alias');

esbuild
  .serve(
    {
      servedir: '.',
    },
    {
      entryPoints: ['./createElement', './startRecursion'],
      outdir: 'out',
      bundle: true,
      format: 'esm',
      jsxFactory: 'h',
      loader: { '.js': 'jsx' },
      plugins: [
        alias({
          vdom: require('path').join(__dirname, '..', 'src', 'index.js'),
        }),
      ],
    }
  )
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
