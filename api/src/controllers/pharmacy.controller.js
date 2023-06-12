const {matchedData} = require('express-validator');
const {pharmacyModel} = require('../models');
const {handleHttpError} = require('../utils/handleError');
const bcrypt = require('bcryptjs');

/**
 * Get Pharmacy data
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getMyPharmacy = async (req, res) => {

  try {

    const company = req.params.pharmacyName;
    const result = await pharmacyModel.findOne({companyName: company})
    if(!result){
      res.status(404).send('Data not Found');
      return;
    }
    result.set('password', undefined, {strict: false});
    res.status(200).json({result});
    
  } catch (error) {
    handleHttpError(res, "Internal Server Error", 500, "getCustomer", error);
  }
}

/**
 * Create Pharmacy in DB
 * @param {*} req 
 * @param {*} res 
 */
const createPharmacy = async (req, res) => {


  try {

    const body = matchedData(req);
    const passPlain = body.password
    const hash = await bcrypt.hash(passPlain, 10);
    const data = {
      ...body,
      password: hash
    };
    const create = await pharmacyModel.create(data);
    create.set('password', undefined, {strict: false});
    res.status(201).json({msg: 'Pharmacy Created', data: create});
    
  } catch (error) {
    if (error.name === 'MongoServerError' && error.code === 11000){
      handleHttpError(res, "Company Already Exist", 400, "createPharmacy", error);
      return;
    }
    handleHttpError(res, "Internal Server Error", 500, "getCustomer", error);
  }
}

/**
 * Update Pharmacy password in DB
 * @param {*} req 
 * @param {*} res 
 */
const updatePharmacyPassword = async (req, res) => {

  try {
    const filter = { email: req.body.email };
    const hash = await bcrypt.hash(req.body.password, 10);
    const update = { password: hash };

    const result = await pharmacyModel.findOneAndUpdate(filter, update);

    if (!result){
      handleHttpError(res, "Could not update password", 400, "updatePharmacyPassword");
      return;
    }
    res
      .json({
        success: true,
        message: "Password Updated"
      })
      .status(200);
    
  } catch (error) {
    handleHttpError(res, "Internal Server Error", 500, "updatePharmacyPassword", error);
  }
}

module.exports = {
  createPharmacy,
  getMyPharmacy,
  updatePharmacyPassword
}