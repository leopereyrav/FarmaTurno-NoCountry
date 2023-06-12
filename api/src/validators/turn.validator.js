const {check} = require('express-validator');
const validateResults = require('../utils/handleValidators');


const validatorCreateTurn = [

  // check('date')
  // .exists()
  // .notEmpty(),
  // check('status')
  // .exists()
  // .notEmpty(),
  check('timeSlot')
  .exists()
  .isString()
  .notEmpty(),
  

  (req, res, next) => {
    return validateResults(req, res, next);
  }
]





module.exports = validatorCreateTurn;