'use strict';

import http from 'http';
import express from 'express';

const NAMESPACE = 'Client';
const app = express();
const router = express.Router();
const { expressCspHeader } = require('express-csp-header');
const path = require('path');
const port = process.env.PORT || 8080;

app.use(express.static(__dirname));

router.get('', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

router.get('/new', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, '/views/newContact.html'));
});

app.use(
  expressCspHeader({
    policies: {
      'default-src': [expressCspHeader.NONE],
      'img-src': [expressCspHeader.SELF]
    }
  })
);

app.use('', router);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type Accept, Authorization');

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
    return res.status(200).json({});
  }
  next();
});

const httpServer = http.createServer(app);
httpServer.listen(port, () => console.log(`${NAMESPACE} running on port ${port}`));
