
const { Providers } = require('../../db/model/providers');

const fromProviderModelToDTO = (providerModel) => {
  return {
    id: providerModel.id,
    rut: providerModel.rut,
    name: providerModel.name,
    accountNumber: providerModel.account,
    accountBank: providerModel.bank,
    email: providerModel.email,
    phone: providerModel.phone
  };
};

class ProviderService {
  async get(id) {
    const providerModel = await Providers.find({
      where: {id}
    });

    if (providerModel == null) {
      return null;
    }

    return fromProviderModelToDTO(providerModel);
  }

  async getAll() {
    try {
      const providerModels = await Providers.findAll();
      return providerModels.map(model => fromProviderModelToDTO(model));
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}

module.exports = {
  ProviderService
};
