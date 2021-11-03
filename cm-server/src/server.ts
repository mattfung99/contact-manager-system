'use strict';

import http from 'http';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import contactRoutes from './routes/contact';

const NAMESPACE = 'Server';
const router = express();

router.get('/', (req, res) => {
  res.send('Content Manager Server is running!');
});

router.use((req, res, next) => {
  logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
  });
  next();
});

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use('/contact', contactRoutes);

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type Accept, Authorization');

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
    return res.status(200).json({});
  }
  next();
});

router.use((req, res, next) => {
  const error = new Error('Not Found');

  return res.status(404).json({
    message: error.message
  });
});

const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
