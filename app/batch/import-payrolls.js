/**
 * Importa las cartolas historicas del banco Scotiabank desde archivos CSV.
 */

const scotiabank = require('../util/scotiabank');
const models = require('../db/models');
const fs = require('fs');

const genPayrolls = (path) => {
  return fs.readdirSync(path)
    .filter((file) => (/\.dat/).test(file) )
    .map(file => path + file);
};

const files = genPayrolls('data/scotiabank/payrolls/');

const computePayrollStatus = (detalles) => {
  let status = null;

  for (let i=0; i<detalles.length; i++) {
    status = detalles[i].estado;

    if (status === 'Pagado') {
      break;
    }
  }

  return status;
};

Promise.all(files.map((file) => {
  const lines = fs.readFileSync(file).toString().split('\n');
  return scotiabank.importPayrollDAT(lines);
})).then((payrolls) => {
  Promise.all(payrolls.map((payroll) => {
    const dbPayrollParams = {
      bank: 'SB',
      date: payroll.detalles[0].fechaPago,
      amount: payroll.detalles
        .map(detalle => detalle.montoPago)
        .reduce( (prev, current) => prev + current),
      status: computePayrollStatus(payroll.detalles),
    };

    models.Payrolls.create(dbPayrollParams).then((dbPayroll) => {
      const dbPayrollId = dbPayroll.id;

      return Promise.all(
        payroll.detalles.map((detalle) => {
          const dbPayrollDetailParams = {
            payroll_id: dbPayrollId,
            rut: detalle.rutBeneficiario,
            name: detalle.nombreBeneficiario,
            date: detalle.fechaPago,
            amount: detalle.montoPago,
            account: detalle.cuentaAbono,
            bank: detalle.bancoAbono,
            status: detalle.estado,
            refund_date: detalle.fechaReabono
          };

          return models.PayrollDetails.create(dbPayrollDetailParams);
        })
      );
    });
  })).then((results) => {
    console.log(results);
  });
}).catch((err) => {
  console.log('Error!');
  console.log(err);
});
