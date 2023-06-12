const {Router} = require('express');
const router = Router();
const {getTurn, getAllTurns, createTurn, modifyTurn, getTurnByDI, getTurnByHour} = require("../controllers/turns.controller");
const {validatorCreateCustomer, validatorCreateTurn, validatorEmail} = require('../validators')

/**
 * Get Turn by Id
 */
router.get('/:id', getTurn);

/**
 * Get Turn by user document
 */
router.get('/usturn/:doc', getTurnByDI);

/**
 * Get Turn by hour
 */
router.get('/hourturn/:hour', getTurnByHour);

/**
 * Get list of Turns
 */
router.get('/', getAllTurns);

/**
 * Create Turn in DB
 */
router.post('/',validatorCreateCustomer, validatorCreateTurn, validatorEmail, createTurn);

/**
 * modify Turn-status in DB
 */
router.put('/:id', modifyTurn);



module.exports = router;