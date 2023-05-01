module.exports = function(api: any) {
  api.cache(true);
  return {
    presets: ['@babel/preset-typescript', '@babel/preset-env'],
  };
};