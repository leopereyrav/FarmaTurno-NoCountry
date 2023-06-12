const {check} = require('express-validator');
const validateResults = require('../utils/handleValidators');


const validatorEmail = [

 
  check('customerEmail')
  .exists()
  .notEmpty()
  .isEmail(),
  
  

  (req, res, next) => {
    return validateResults(req, res, next);
  }
]





module.exports = validatorEmail;