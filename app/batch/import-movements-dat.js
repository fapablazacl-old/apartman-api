/**
 * Importa las cartolas historicas del banco Scotiabank desde archivos DAT.
 */

const scotiabank = require('../util/scotiabank');
const models = require('../db/models');
const fs = require('fs');

const file = 'data/scotiabank/statements/bsa.dat';
const lines = fs.readFileSync(file).toString().split('\n');

scotiabank.importBankStatementDAT(lines).then((movements) => {
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
});
