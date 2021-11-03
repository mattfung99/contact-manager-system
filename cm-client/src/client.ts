const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;

app.get('', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

http.createServer(app).listen(port);
