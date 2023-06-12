const {check} = require('express-validator');
const validateResults = require('../utils/handleValidators');


const validatorCreateCustomer = [

  check('name')
  .exists()
  .notEmpty()
  .isString(),
  check('surName')
  .exists()
  .notEmpty()
  .isString(),
  check('identificationNumber')
  .exists()
  .notEmpty()
  .isNumeric()
  .isLength({min: 6, max: 10}),
 
  

  (req, res, next) => {
    return validateResults(req, res, next);
  }
]





module.exports = validatorCreateCustomer;