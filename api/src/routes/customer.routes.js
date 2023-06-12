const {Router} = require('express');
const router = Router();
const {validatorMongoId, validatorIdentification, validatorCreateCustomer} = require('../validators');
const {getCustomerById, getCustomerByIdentificationNumber, getCustomers, createCustomer, deleteCustomer} = require('../controllers/customer.controller');


/**
 * Get customer details by id
 */
router.get('/:id',validatorMongoId, getCustomerById);

/**
 * Get customer details by identification number
 */
router.get('/in/:in',validatorIdentification, getCustomerByIdentificationNumber);

/**
 * Get list of customers
 */
router.get('/', getCustomers);

/**
 * Create customer in DB
 */
router.post('/',validatorCreateCustomer, createCustomer);

/**
 * Delete customer
 */
router.delete('/in/:in',validatorIdentification, deleteCustomer);




module.exports = router;