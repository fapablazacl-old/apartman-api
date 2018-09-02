
const { BaseDTO, fields, errors } = require('dtox');

const INVOICE_MAPPING = {
  rut: fields.string(),
  name: fields.string(),
  kind: fields.string(), 
  amount: fields.string()
};

class InvoiceDTO extends BaseDTO {
  constructor(data) {
    super(data, INVOICE_MAPPING);
  }
};

module.exports = {
    InvoiceDTO
};
