
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const urlBase = '/api/v1';
const port = 8000;

app.use(bodyParser());

app.use(`${urlBase}`, require('./app/api/provider/provider-route'));
app.use(`${urlBase}`, require('./app/api/person/person-route'));

const server = app.listen(port, () => {
  const address = server.address();
  console.log(`Listening at ${address.address}:${address.port}`);
});
