const path = require('path');

const serverDistPath = path.join(
  process.cwd(),
  'dist/e-commerce/server/main.server.mjs'
);

module.exports = async (req, res) => {
  const app = await import(serverDistPath);
  return app.app(req, res);
};
