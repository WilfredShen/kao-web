module.exports = {
<<<<<<< HEAD
    publicPath: "/",
    outputDir: "dist",
    productionSourceMap: false,
    devServer: {
        host: "localhost",
        port: "9090",
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "",
                },
            },
        },
    },
}
=======
  publicPath: "/",
  outputDir: "dist",
  productionSourceMap: false,
  devServer: {
    host: "localhost",
    port: "9090",
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
}
>>>>>>> 6a11c12626f042e559b9256082a88e24950a12aa
