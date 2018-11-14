/**
 * Importa las cartolas historicas del banco Scotiabank desde archivos DAT.
 */

const scotiabank = require('../util/scotiabank');
const models = require('../db/models');
const fs = require('fs');

const md5 = require('md5');

const file = 'data/scotiabank/statements/bsa.dat';
const lines = fs.readFileSync(file).toString().split('\n');

scotiabank.importBankStatementDAT(lines).then((result) => {
  const { movements, lines } = result;

  Promise.all(movements.map((movement, index) => {
    const line = lines[index];
    const hashId = md5(line);

    return models.Movements.find({ where: { hashId } }).then((movementDb) => {
      console.log(movementDb);

      if (movementDb == null) {
        movementDb = models.Movements.create({
          hashId: md5(line),
          bank: 'SB',
          date: movement.fecha,
          amount: movement.cargos != null ? -movement.cargos : movement.abonos,
          description: movement.descripcion,
          document_number: movement.ndoc,
        })
      }

      return movementDb;
    });

  })).then((results) => {
    console.log('Done!');
    console.log(results);
  }).catch((err) => {
    console.log('Error!');
    console.log(err);
  });
});
