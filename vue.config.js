module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: "http://10.0.0.71:8000/"
  }
};
