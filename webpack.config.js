var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = (env, argv) => {
  
  return {
    target: 'node',
    entry: './lib/HvcP2.js',
    output: {
      filename: 'hvcp2.js'
    },
    mode: argv.mode,
    externals: nodeModules,
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: [[
              'env', {
                targets: {
                  node: 'current'
                }
              }
            ]]
          }
        }
      ]
    }
  };
};
