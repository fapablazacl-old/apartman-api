
const { ProviderService } = require('./provider-service');

class ProviderController {
  constructor() {
    this._providerService = new ProviderService();
  }

  async get(id) {
    if (id == null) {
      return this._providerService.getAll();
    }

    return this._providerService.get(id);
  }

  /*
  async post(provider) {
    provider.id = this.currentId;
    providers.push(provider);

    const payload = {
      id: this.currentId
    }

    this.currentId += 1;

    return payload;
  }
  */
}

module.exports = {
  ProviderController
};
