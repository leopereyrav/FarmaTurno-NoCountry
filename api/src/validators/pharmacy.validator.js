const { check } = require("express-validator");
const validateResults = require("../utils/handleValidators");

const validatorCreatePharmacy = [
  check("name")
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
  check("companyName")
  .exists()
  .notEmpty()
  .isString(),
  check("nit")
  .exists()
  .notEmpty()
  .isString(),
  check("city")
  .exists()
  .notEmpty()
  .isString(),
  check("address")
  .exists()
  .notEmpty()
  .isString(),
  check("email")
  .exists()
  .notEmpty()
  .isEmail(),
  check("hourAttention")
  .exists()
  .notEmpty()
  .isString(),
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

module.exports = validatorCreatePharmacy;