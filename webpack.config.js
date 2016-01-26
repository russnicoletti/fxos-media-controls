module.exports = {
  entry: './src/fxos-media-controls.js',
  output: {
    filename: 'fxos-media-controls.js',
    library: 'FXOSMediaControls',
    libraryTarget: 'umd'
  },

  externals: {
    'fxos-component': {
      root: 'fxosComponent',
      commonjs: 'fxos-component',
      commonjs2: 'fxos-component',
      amd: 'fxos-component'
    }
  }
};
