
const { BaseDTO, fields, errors } = require('dtox');

const PERSON_MAPPING = {
  rut: fields.string(),
  names: fields.string(),
  fatherName: fields.string(), 
  motherName: fields.string()
};

class PersonDTO extends BaseDTO {
  constructor(data) {
    super(data, PERSON_MAPPING);
  }
};

module.exports = {
  PersonDTO
};
