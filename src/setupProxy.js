const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const url = process.env.REACT_APP_SERVER;
  app.use(
    "/api",
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  );
};
