const validators = {
  validatorMongoId: require('./mongoId.validator'),
  validatorCreateCustomer: require('./customer.validator'),
  validatorCreateTurn: require('./turn.validator'),
  validatorIdentification: require('./identification.validator'),
  validatorEmail: require('./customerEmail.validator'),
  validatorCreatePharmacy: require('./pharmacy.validator'),
  validatorLoginPharmacy: require('./login.validator'),

}


module.exports = validators;