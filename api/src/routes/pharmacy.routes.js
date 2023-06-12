const {Router} = require('express');
const {validatorCreatePharmacy} = require('../validators');

const {getMyPharmacy, createPharmacy, updatePharmacyPassword} = require('../controllers/pharmacy.controller');
const verificateToken = require('../middlewares/token.middleware');

const router = Router();


/**
 * Get pharmacy details by Name
 */
router.get('/:pharmacyName', verificateToken, getMyPharmacy);

/**
 * Create pharmacy in DB
 */
router.post('/',validatorCreatePharmacy, createPharmacy);

router.put('/', updatePharmacyPassword);



module.exports = router;