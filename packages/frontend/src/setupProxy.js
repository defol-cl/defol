// react docs:    https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually
// stackoverflow: https://stackoverflow.com/q/58431098/6697093

const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: process.env.REACT_APP_DEV_PROXY,
      changeOrigin: true,
    }),
  );
};
