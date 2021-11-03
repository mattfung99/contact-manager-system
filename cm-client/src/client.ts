let http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('/assets'));

app.get('/', (req: any, res: any) => {
  res.sendFile(path.join('/assets', '/index.html'));
});

http.createServer(app).listen(port);
