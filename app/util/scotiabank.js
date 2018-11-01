
const parse = require('csv-parse');

const importMovements = async (lines) => {
  const csv = lines.slice(22).join('\n');

  return new Promise((resolve, reject) => {
    parse(csv, {delimiter: ';'}, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        // const headers = output[0];
        // const rows = output.slice(1);
      
        const movements = rows.map((row) => {
          return {
            fecha: row[1],
            descripcion: row[2],
            ndoc: row[3],
            cargos: row[4],
            abonos: row[5],
            saldos: row[6]
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
