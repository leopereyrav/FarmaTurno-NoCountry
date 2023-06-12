const { check } = require("express-validator");
const validateResults = require("../utils/handleValidators");

const validatorLoginPharmacy = [
  
  check("userName")
  .exists()
  .notEmpty()
  .isString(),
  check("password")
  .exists()
  .notEmpty()
  .isString(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = validatorLoginPharmacy;