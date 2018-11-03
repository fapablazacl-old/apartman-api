
const fs = require('fs');
const { importBankStatement, importPayroll } = require('./scotiabank.js');

fs.readFile('./bns.csv', (err, data) => {
  const lines = data.toString().split('\n');

  importBankStatement(lines).then((movements) => {
    console.log(movements);
  }).catch((err) => {
    console.log(err);
  });
});
