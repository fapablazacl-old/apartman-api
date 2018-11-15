
const parse = require('csv-parse');

const importBankStatementCSV = async (lines) => {
  const parseDate = (date) => {
    const fechaParts = date.split('/').map(part => parseInt(part, 10));
    return new Date(fechaParts[2], fechaParts[1] - 1, fechaParts[0]);
  };

  const parseAmount = (amount) => {
    return amount === '' ? null : parseInt(amount.split('.').join(''), 10);
  };

  const csv = lines.slice(21).join('\n');

  return new Promise((resolve, reject) => {
    parse(csv, {delimiter: ';'}, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const movements = rows.map((row) => {
          return {
            fecha: parseDate(row[1]),
            descripcion: row[2],
            ndoc: parseInt(row[3], 10) === 0 ? null : parseInt(row[3], 10),
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

const importBankStatementDAT = async (lines) => {
  const parseDate = (date) => {
    const trimmedDate = date.trim();

    const dayPart = parseInt(trimmedDate.substring(0, 2));
    const monthPart = parseInt(trimmedDate.substring(2, 4));
    const yearPart = parseInt(trimmedDate.substring(4, 8));
    
    return new Date(yearPart, monthPart - 1, dayPart);
  };

  const parseAmount = (rawAmount) => {
    const amount = rawAmount.trim();

    if (amount === '') {
      return null;
    }

    const commaIndex = amount.indexOf(',');

    if (commaIndex !== -1) {
      const amountTemp = amount.substring(0, amount.indexOf(','));
      return parseInt(amountTemp, 10);  
    } else {
      return parseInt(amount, 10);
    }
  };

  const parseCheckNumber = (checkNumber) => {
    const number = parseInt(checkNumber, 10);
    return number === 0 ? null : number;
  };

  const slicedLines = lines.slice(9);
  const csv = slicedLines.join('\n');

  return new Promise((resolve, reject) => {
    parse(csv, {delimiter: ';'}, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const movements = rows.map((row) => {
          return {
            fecha: parseDate(row[0]),
            descripcion: row[1].trim(),
            ndoc: parseCheckNumber(row[2]),
            cargos: parseAmount(row[3]),
            abonos: parseAmount(row[4]),
            saldos: parseAmount(row[5])
          };
        });

        resolve({movements, lines: slicedLines});
      }
    });
  });
};

const importPayrollDAT = async (lines) => {
  const parseDate = (date) => {
    const yearPart = parseInt(date.substring(0, 4));
    const monthPart = parseInt(date.substring(4, 6)) - 1;
    const dayPart = parseInt(date.substring(6, 8));

    return new Date(yearPart, monthPart, dayPart);
  };

  const parseRut = (rut) => {
    const base = parseInt(rut.substring(0, rut.length - 1), 10);

    return `${base}`;
    /*
    const base = parseInt(rut.substring(0, rut.length - 1), 10);
    const digit = rut.substring(rut.length - 1, rut.length);

    return `${base}-${digit}`;
    */
  };

  const csv = lines.slice(1).join('\n');

  return new Promise((resolve, reject) => {
    parse(csv, {delimiter: ';', relax_column_count: true}, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const details = rows.map((row) => {
          return {
            fechaPago: parseDate(row[0]),
            rutBeneficiario: parseRut(row[1]),
            nombreBeneficiario: row[2].trim(),
            formaPago: row[3],
            montoPago: parseInt(row[4], 10),
            cuentaAbono: parseInt(row[5], 10),
            bancoAbono: row[6].trim(),
            estado: row[7].trim(),
            fechaReabono: row[8] === '00000000' ? null : parseDate(row[8]),
            motivoRechazo: row[9].trim() === 'Sin Observaciones' ? null : row[9].trim()
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
  importBankStatementCSV,
  importBankStatementDAT,
  importPayrollDAT
};
