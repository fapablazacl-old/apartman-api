
const express = require('express');
const router = express.Router();

const { PersonDTO } = require('./person-dto');
const { PersonController } = require('./person-controller');

const baseName = '/persons'
const controller = new PersonController();

router.get(`${baseName}`, (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  controller.get().then((result) => {
    res.end(JSON.stringify(result));
  }).catch((err) => {
    res.end(JSON.stringify(err));
  });
});

router.get(`${baseName}/:id`, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  controller.get(parseInt(req.params.id)).then((result) => {
    res.end(JSON.stringify(result));
  }).catch((err) => {
    res.end(JSON.stringify(err));
  });
});

router.post(`${baseName}`, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  console.log(req.body);
  const provider = new PersonDTO(req.body);

  controller.post(provider).then((result) => {
    res.end(JSON.stringify(result));
  }).catch((err) => {
    res.end(JSON.stringify(err));
  });
});

module.exports = router;
