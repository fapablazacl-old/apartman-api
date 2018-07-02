
const { Providers } = require('./model/providers');

const fromProviderModelToDTO = (providerModel) => {
  return {
    rut: providerDB.rut,
    name: providerDB.name,
    accountNumber: providerDB.account,
    accountBank: providerDB.bank,
    email: providerDB.email,
    phone: providerDB.phone
  };
};

class ProviderService {
  async get(id) {
    const providerModel = await Providers.find({
      where: {id}
    });

    return fromProviderModelToDTO(providerModel);
  }

  async getAll() {
    const providerModels = await Providers.findAll();
    return providerModels.map(model => fromProviderModelToDTO(model));
  }
}

module.exports = {
  ProviderService
};
