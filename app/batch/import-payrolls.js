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

Promise.all(files.map((file) => {
  const lines = fs.readFileSync(file).toString().split('\n');
  return scotiabank.importPayroll();
})).then((payrolls) => {
  Promise.all(payrolls.map((payroll) => {
    models.Payrolls.create({
      bank: 'SB',
      date: payroll.detalles[0].fechaPago,
      amount: payroll.detalles.reduce((previous, current) => {
        return previous + current;
      }, 0)
    }).then((dbPayroll) => {
      const dbPayrollId = dbPayroll.id;

      return Promise.all(
        payroll.detalles.map((detalle) => {
          models.PayrollDetails.create({
            payroll_id: dbPayrollId,
            rut: detalle.rutBeneficiario,
            name: detalle.nombreBeneficiario,
            date: detalle.fechaPago,
            amount: detalle.montoPago,
            account: detalle.cuentaAbono,
            bank: detalle.bancoAbono,
            status: detalle.estado,
            refund_date: detalle.fechaReabono
          });
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
