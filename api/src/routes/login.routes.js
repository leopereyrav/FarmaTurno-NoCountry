const {Router} = require('express');
const {validatorLoginPharmacy} = require('../validators');
const {loginMyPharmacy} = require('../controllers/login.controller');
const router = Router();


/**
 * Login to pharmacy account
 */
router.post('/', validatorLoginPharmacy, loginMyPharmacy);




module.exports = router;