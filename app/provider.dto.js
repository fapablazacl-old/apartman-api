
const { BaseDTO, fields, errors } = require('dtox');

const PROVIDER_MAPPING = {
  rut:            fields.string(),
  name:           fields.string(),
  accountNumber:  fields.string(),
  accountBank:    fields.string(),
  email:          fields.string()
};

class ProviderDTO extends BaseDTO {
  constructor(data) {
    super(data, PROVIDER_MAPPING);
  }
};

module.exports = {
  ProviderDTO
};
