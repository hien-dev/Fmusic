// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
          alias: {
            '@assets': './assets',
            '@app': './src/app',
            '@features': './src/features',
            '@shared': './src/shared'
          }
        }
      ]
    ]
  };
};
