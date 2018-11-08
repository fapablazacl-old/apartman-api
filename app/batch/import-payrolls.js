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

Promise.all(files.map((file) => {
  const lines = fs.readFileSync(file).toString().split('\n');
  return scotiabank.importPayroll(lines);
})).then((payrolls) => {
  Promise.all(payrolls.map((payroll) => {
    models.Payrolls.create({
      bank: 'SB',
      date: movement.fecha,
      amount: movement.cargos != null ? -movement.cargos : movement.abonos,
      description: movement.descripcion,
      documentNumber: movement.ndoc,
    }).then((dbPayroll) => {
      
    });
  })).then((results) => {
    console.log(results);
  });
}).catch((err) => {
  console.log('Error!');
  console.log(err);
});
