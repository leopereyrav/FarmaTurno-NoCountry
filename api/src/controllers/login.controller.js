//const {matchedData} = require('express-validator');
const {pharmacyModel} = require('../models');
const {handleHttpError} = require('../utils/handleError');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

/**
 * Get Pharmacy data
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const loginMyPharmacy = async (req, res) => {

  try {
    //Reading environment variable JWT_SECRET_KEY as secretkey
    dotenv.config();
    const secretKey = process.env.JWT_SECRET_KEY;
    
    //Verificate that credentials exists in DB
    const data = await pharmacyModel.findOne({userName: req.body.userName});
    if(!data){
      handleHttpError(res, "Incorrect Password or User", 400, "loginMyPharmacy");
      return;
    }

    //Verificate that password is correct
    const result = await bcrypt.compare(req.body.password, data.password);
    if(!result){
      handleHttpError(res, "Incorrect Password or User", 400, "loginMyPharmacy");
      return;
    }

    //Create token
    const token = jwt.sign(req.body,secretKey);

    //Send token as a response with status 200
    res.json({
        companyName: data.companyName,
        token
    }).status(200);

  } catch (error) {
    handleHttpError(res, "Internal Server Error", 500, "loginMyPharmacy", error);
  }
}



module.exports = {
    loginMyPharmacy
}