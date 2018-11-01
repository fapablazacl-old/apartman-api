
const parse = require('csv-parse');
const fs = require('fs');

fs.readFile('./53323263-9_03072018_31072018.csv', (err, data) => {
  const csvContent = data.toString();

  parse(csvContent, {delimiter: ';'}, (err, output) => {
    const headers = output[0];
    const rows = output.slice(1);

    const invoices = rows.map((row) => {
      return {
        providerRut: row[1],
        providerName: row[2],
        type: row[3],
        number: row[4],
        emissionDate: row[5],
        amount: row[6],
        receptionDate: row[7],
        trackId: row[8],
      };
    });

    console.log(invoices);
  });
});

/*
parse()

const headers = [
  Linea
  Rut Emisor
  Razon Social
  Tipo Dte
  Folio Dte
  Fecha Emision(DD-MM-AAAA)
  Monto Total
  Fecha Hora Recepcion(DD-MM-AAAA HH:MM)
  TrackId
]
*/
