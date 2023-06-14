module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // need to add the plugin into babel config in order for the package to work
    plugins: [
      [
        'react-native-reanimated/plugin', {
          relativeSourceLocation: true,
        },
      ]
    ]
  };
};
