
const parse = require('csv-parse');

const parseDate = (date) => {
  const fechaParts = date.split('/').map(part => parseInt(part, 10));
  return new Date(fechaParts[2], fechaParts[1], fechaParts[0]);
};

const parseAmount = (amount) => {
  return amount === '' ? null : parseInt(amount.split('.').join(''), 10);
};

const importMovements = async (lines) => {
  const csv = lines.slice(22).join('\n');

  return new Promise((resolve, reject) => {
    parse(csv, {delimiter: ';'}, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const movements = rows.map((row) => {
          return {
            fecha: parseDate(row[1]),
            descripcion: row[2],
            ndoc: parseInt(row[3], 10) === 0 ? null : row[3],
            cargos: parseAmount(row[4]),
            abonos: parseAmount(row[5]),
            saldos: parseAmount(row[6])
          };
        });

        resolve(movements);
      }
    });
  });
};

module.exports = {
  importMovements
};


const fs = require('fs');

fs.readFile('./bns.csv', (err, data) => {
  const lines = data.toString().split('\n');

  importMovements(lines).then((movements) => {
    console.log(movements);
  }).catch((err) => {
    console.log(err);
  });
});
