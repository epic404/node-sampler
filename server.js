const express = require('express');
const server = express();
const port = process.env.PORT || 3000;
const initMiddleware = require('./middleware');
const router = require('./routers');

initMiddleware(server);
server.use('/', router);

module.exports = server;

if (require.main === module) {
  server.listen((port), () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}
