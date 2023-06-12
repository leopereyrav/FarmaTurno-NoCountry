const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const { customerModel } = require("../models");

/**
 * Get customer details by id
 * @param {*} req
 * @param {*} res
 */
const getCustomerById = async (req, res) => {
  try {
    
    req = matchedData(req);
    const data = await customerModel.findOne({
      _id: req.id
    });
    
    if (!data){
      handleHttpError(res, "Customer Not Found", 404, "getCustomer");
      return;
    } else {
      res
        .json(data)
        .status(200);
      return;
    }
  } catch (error) {
    handleHttpError(res, "Internal Server Error", 500, "getCustomer", error);
  }
};

/**
 * Get customer details by identification number
 * @param {*} req
 * @param {*} res
 */
const getCustomerByIdentificationNumber = async (req, res) => {
  try {
    
    req = matchedData(req);
    const data = await customerModel.findOne({
      identificationNumber: req.in
    });
    
    if (!data){
      handleHttpError(res, "Customer Not Found", 404, "getCustomer");
      return;
    } else {
      res
        .json(data)
        .status(200);
      return;
    }
  } catch (error) {
    handleHttpError(res, "Internal Server Error", 500, "getCustomer", error);
  }
};

/**
 * Get customer list from DataBase
 * @param {*} req
 * @param {*} res
 */
const getCustomers = async (req, res) => {
  try {
    const data = await customerModel.find();
    if (!data){
      handleHttpError(res, "Customers Not Found", 404, "getCustomers");
      return;
    } else {
      res
        .json(data)
        .status(200);
      return;
    }
  } catch (error) {
    handleHttpError(res, "Internal Server Error", 500, "getCustomers", error);
  }
};

/**
 * Create customer in DataBase
 * @param {*} req
 * @param {*} res
 */
const createCustomer = async (req, res) => {
  try {
    req = matchedData(req);
    
    const data = await customerModel(req);
    
    data.turnHistory = [{
      registry: new Date(Date.now()).toISOString()
    }];

    await data.save();

    res
      .json({
        success: true,
        message: "Customer Created",
        data: data
      })
      .status(200);
    return;

  } catch (error) {
    if (error.name === 'MongoServerError' && error.code === 11000){
      handleHttpError(res, "Mobile phone already exists", 422, "createCustomer", error);
    }
    else {
      handleHttpError(res, "Internal Server Error", 400, "createCustomer", error);
    }
  }
};

/**
 * Delete customer from DataBase
 * @param {*} req
 * @param {*} res
 */
const deleteCustomer = async (req, res) => {
  try {
    req = matchedData(req);
    const data = await customerModel.findOneAndDelete({
      identificationNumber: req.in
    });
    if (!data){
      handleHttpError(res, "Customer Not Found", 404, "getCustomer");
      return;
    } else {
      res
        .json({
          success: true,
          message: "Customer Deleted",
          data: data
        })
        .status(200);
      return;
    }
  } catch (error) {
    handleHttpError(res, "Internal Server Error", 500, "deleteCustomer", error);
  }
};

module.exports = {
  getCustomerById,
  getCustomerByIdentificationNumber,
  getCustomers,
  createCustomer,
  deleteCustomer,
};
