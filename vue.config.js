module.exports = {
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
