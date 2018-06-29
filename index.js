const express = require('express');
const app = express();
const router = express.Router;

const providers = [
    {
        name: 'Scharfstein',
        account: '1121-3231-1-23'
    }, {
        name: 'EBSA',
        account: '000112-231-23'
    },
];

const urlBase = '/api/v1';

app.get(`${urlBase}/providers`, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(providers));
});

app.get(`${urlBase}/providers/:id`, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(providers[req.params.id]));
});

const port = 8000;

const server = app.listen(port, () => {
    const address = server.address();
    console.log(`Listening at ${address.address}:${address.port}`);
});
