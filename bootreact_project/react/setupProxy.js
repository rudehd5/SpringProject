const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:9000",
            changeOrigin: true,
        })
    );

    // app.use(
    //     "/api",
    //     createProxyMiddleware('/login',{
    //         target: "http://localhost:9000",
    //         changeOrigin: true,
    //     })
    // );
}