const {check} = require('express-validator');
const validateResults = require('../utils/handleValidators');


const validatorMongoId = [

  check('id')
  .exists()
  .notEmpty()
  .isMongoId(),
  

  (req, res, next) => {
    return validateResults(req, res, next);
  }
]





module.exports = validatorMongoId;