
const { BaseDTO, fields, errors } = require('dtox');

const PROVIDER_MAPPING = {
  rut: fields.string(),
  name: fields.string(),
  accountNumber: fields.number({
    default: null
  }),
  accountBank: fields.string({
    default: null
  }),
  email: fields.string({
    default: null
  }),
  phone: fields.string({
    default: null
  })
};

class ProviderDTO extends BaseDTO {
  constructor(data) {
    super(data, PROVIDER_MAPPING);
  }
};

module.exports = {
  ProviderDTO
};
