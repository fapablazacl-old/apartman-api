/**
 * Importa las cartolas historicas del banco Scotiabank desde archivos CSV.
 */

const scotiabank = require('../util/scotiabank');
const models = require('../db/models');
const fs = require('fs');

const files = [
    'data/scotiabank/bns (0).csv',
    'data/scotiabank/bns (1).csv',
    'data/scotiabank/bns (2).csv',
    'data/scotiabank/bns (3).csv',
    'data/scotiabank/bns (4).csv'
];

const movements = files
  .map((file) => {
    return fs.readFileSync(file).toString().split('\n');
  })
  .reduce((previous, current) => {
    console.log(previous);
    const result = [];

    result.concat(previous);
    result.concat(current);

    return result;
  });

scotiabank.importBankStatement(movements).then((statement) => {
  console.log(statement);
}).catch((err) => {
  console.log(err);
});

/*
fs.readFile('./bsa.dat', (err, data) => {
  const lines = data.toString().split('\n');

  importPayroll(lines).then((nomina) => {
    console.log(nomina.detalles);
    // console.log(nomina.detalles.filter(detalle => detalle.estado !== 'Pagado'));
  }).catch((err) => {
    console.log(err);
  });
});
*/
