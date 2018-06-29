
const express = require('express');
const app = express();
const router = express.Router;

const { ProviderDTO } = require('./app/provider.dto');
const { ProviderController } = require('./app/provider.controller');

const urlBase = '/api/v1';
const port = 8000;

const providerController = new ProviderController();

app.get(`${urlBase}/providers`, (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  providerController.get().then((result) => {
    res.end(JSON.stringify(result));
  }).catch((err) => {
    res.end(JSON.stringify(err));
  });
});

app.get(`${urlBase}/providers/:id`, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  providerController.get(parseInt(req.params.id)).then((result) => {
    res.end(JSON.stringify(result));
  }).catch((err) => {
    res.end(JSON.stringify(err));
  });
});

/*
app.put(`${urlBase}/providers`, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(providers[req.params.id]));
});
*/

const server = app.listen(port, () => {
  const address = server.address();
  console.log(`Listening at ${address.address}:${address.port}`);
});
