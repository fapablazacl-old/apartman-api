/**
 * Importa las cartolas historicas del banco Scotiabank desde archivos CSV.
 */

const scotiabank = require('../util/scotiabank');
const models = require('../db/models');
const fs = require('fs');

const files = [
    'data/scotiabank/statements/bns (0).csv',
    'data/scotiabank/statements/bns (1).csv',
    'data/scotiabank/statements/bns (2).csv',
    'data/scotiabank/statements/bns (3).csv',
    'data/scotiabank/statements/bns (4).csv'
];

Promise.all(files.map((file) => {
  const lines = fs.readFileSync(file).toString().split('\n');
  return scotiabank.importBankStatement(lines);
})).then((statements) => {
  const movements = statements.reduce((previous, current) => {
    return previous.concat(current);
  });

  Promise.all(movements.map((movement) => {
    return models.Movements.create({
      bank: 'SB',
      date: movement.fecha,
      amount: movement.cargos != null ? -movement.cargos : movement.abonos,
      description: movement.descripcion,
      document_number: movement.ndoc,
    });
  })).then((results) => {
    console.log('Done!');
    console.log(results);
  }).catch((err) => {
    console.log('Error!');
    console.log(err);
  });
}).catch((err) => {
  console.log('Error!');
  console.log(err);
});
