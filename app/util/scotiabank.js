
const parse = require('csv-parse');

const importBankStatement = async (lines) => {
  const parseDate = (date) => {
    const fechaParts = date.split('/').map(part => parseInt(part, 10));
    return new Date(fechaParts[2], fechaParts[1], fechaParts[0]);
  };

  const parseAmount = (amount) => {
    return amount === '' ? null : parseInt(amount.split('.').join(''), 10);
  };

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

const importPayroll = async (csv) => {
  return new Promise((resolve, reject) => {
    parse(csv, {delimiter: ';', relax_column_count: true}, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const details = rows.map((row) => {
          return {
            fechaPago: row[0],
            rutBeneficiario: row[1],
            nombreBeneficiario: row[2].trim(),
            formaPago: row[3],
            montoPago: row[4],
            cuentaAbono: row[5],
            bancoAbono: row[6].trim(),
            estado: row[7].trim(),
            fechaReabono: row[8],
            motivoRechazo: row[9].trim()
          };
        });

        const nomina = {
          detalles: details
        };

        resolve(nomina);
      }
    });
  });
};

module.exports = {
  importBankStatement,
  importPayroll
};
