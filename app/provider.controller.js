
/*
const providers = [
  {
    id: 1,
    rut: '767434928', 
    name: 'REALE CHILE SEGUROS GENERALES S. A', 
    accountNumber: '71573656', 
    accountBank: 'Santander',
    email: 'ana.bahamonde@reale.cl'
  }, {
    id: 2,
    rut: '967944408', 
    name: 'HEAVENWARD ASCENSORES', 
    accountNumber: '18311962', 
    accountBank: 'BCI',
    email: 'cobranza@heavenward.cl'
  }, {
    id: 3,
    rut: '141769480', 
    name: 'GREENMAX', 
    accountNumber: '15180100826', 
    accountBank: 'Falabella', 
    email: 'contacto@greenmax.cl'
  }  
];
*/

const { ProviderService } = require('./provider.service');

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
