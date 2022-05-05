const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./", // 构建好的文件输出到哪里
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8880",
        changeOrigin: true,
        // secure: false,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
});
