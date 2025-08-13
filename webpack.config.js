const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

const mfConfig = withModuleFederationPlugin({
  remotes: {
    "sige2Mfe": "http://localhost:6301/remoteEntry.js",
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});

module.exports = {
  ...mfConfig,
  experiments: {
    outputModule: true,
  },
};
