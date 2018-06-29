
const express = require('express');
const app = express();
const router = express.Router;

const bodyParser = require('body-parser');

const { ProviderDTO } = require('./app/provider.dto');
const { ProviderController } = require('./app/provider.controller');

const urlBase = '/api/v1';
const port = 8000;

const providerController = new ProviderController();

app.use(bodyParser());

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

app.post(`${urlBase}/providers`, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  console.log(req.body);
  const provider = new ProviderDTO(req.body);

  providerController.post(provider).then((result) => {
    res.end(JSON.stringify(result));
  }).catch((err) => {
    res.end(JSON.stringify(err));
  });
});

const server = app.listen(port, () => {
  const address = server.address();
  console.log(`Listening at ${address.address}:${address.port}`);
});
