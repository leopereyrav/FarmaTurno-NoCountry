const {check} = require('express-validator');
const validateResults = require('../utils/handleValidators');


const validatorIdentification = [

  check('in')
  .exists()
  .notEmpty()
  .isNumeric()
  .isLength({min: 6, max: 10}),
  

  (req, res, next) => {
    return validateResults(req, res, next);
  }
]





module.exports = validatorIdentification;