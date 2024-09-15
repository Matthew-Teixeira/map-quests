// config-overrides.js
module.exports = function override(config, env) {
    const babelLoader = config.module.rules.find(
      (rule) => rule.oneOf !== undefined
    ).oneOf.find(
      (rule) => rule.loader && rule.loader.includes('babel-loader')
    );
  
    babelLoader.exclude = [/node_modules\/mapbox-gl\//]; // Ignore Mapbox from transpiling
  
    return config;
  };
  