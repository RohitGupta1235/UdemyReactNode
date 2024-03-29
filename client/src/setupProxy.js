const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );

  app.use(
    "/api/stripe",
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );

  app.use(
    "/api/current_user",
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};

// "proxy": {
//   "/auth/google": {
//     "target": "http://localhost:5000"
//   },
//   "/api/*": {
//     "target": "http://localhost:5000"
//   }
// },
