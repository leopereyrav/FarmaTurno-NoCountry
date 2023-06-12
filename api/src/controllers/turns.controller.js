const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const { turnModel, customerModel } = require("../models");
const handleSendEmail = require("../utils/handleSendEmail");
const { dateFormat , hourFormat } = require("../utils/handleDate");

const dateSis = dateFormat();
const hourSis = hourFormat();

/**
 * Get Turn by id
 * @param {*} req
 * @param {*} res
 */
const getTurn = async (req, res) => {
  try {
    const id = req.params.id.toString();
    const find = await turnModel.findById(id);
    if (!find) {
      handleHttpError(res, "Id not found", 404, "getTurn");
      return;
    } else {
      res.status(200).send(find);
    }
  } catch (error) {
    handleHttpError(res, "Internal Server Error", 500, "getTurn", error);
  }
};

/**
 * Get Turn by user document
 * @param {*} req
 * @param {*} res
 */
const getTurnByDI = async (req, res) => {
  try {
    const doc = req.params.doc;
    const find = await turnModel.find({
      "customer.identificationNumber": { $eq: doc },
    });
    if (!find.length) {
      handleHttpError(res, "Turns for document not found", 404, "getTurnByDI");
      return;
    } else {
      res.status(200).send(find);
    }
  } catch (error) {
    handleHttpError(res, "Internal Server Error", 500, "getTurnByDI", error);
  }
};

/**
 * Get Turn by Hour
 * @param {*} req
 * @param {*} res
 */
const getTurnByHour = async (req, res) => {
  try {
    const hour = req.params.hour.toString();
    const find = await turnModel.find({ timeSlot: { $eq: hour }
    });
    if (!find.length) {
      handleHttpError(res, "Turns for hour not found", 404, "getTurnByHour");
      return;
    } else {
      res.status(200).send(find);
    }
  } catch (error) {
    handleHttpError(res, "Internal Server Error", 500, "getTurnByHour", error);
  }
};

/**
 * Get Turns from DataBase
 * @param {*} req
 * @param {*} res
 */
const getAllTurns = async (req, res) => {
  try {
    const turns = await turnModel.find({});
    if (!turns.length) {
      handleHttpError(res, "Turns not Found", 404, "getAllTurns");
      return;
    } else {
      res.status(200).send(turns);
    }
  } catch (error) {
    handleHttpError(res, "Internal Server Error", 500, "getAllTurns", error);
  }
};

/**
 * Create Turn in DataBase
 * @param {*} req
 * @param {*} res
 */
const createTurn = async (req, res) => {
  try {
    const body = matchedData(req);
    const cont = await turnModel.find({
      timeSlot: { $eq: body.timeSlot },
    });
    const user = await customerModel.find({
      identificationNumber: { $eq: body.identificationNumber },
    });
    const newUser = {
      name: body.name,
      surName: body.surName,
      identificationNumber: body.identificationNumber,
      customerEmail: body.customerEmail,
    };
    const newTurn = {
      timeSlot: body.timeSlot,
      customer: {
        customerId: body.customerId,
        name: body.name,
        surName: body.surName,
        identificationNumber: body.identificationNumber,
        customerEmail: body.customerEmail,
      },
    };
    const data = [{
      customerEmail: body.customerEmail,
      customerName: body.name +" "+ body.surName,
      hour: body.timeSlot,
      action: 'create'
    }]
    if (!user.length && cont.length < 10) {
      await customerModel.create(newUser);
      await customerModel.updateOne(
        { identificationNumber: body.identificationNumber },
        { turnHistory: [{ registry: dateSis, timeSlot: hourSis}] }
      );
      await turnModel.create(newTurn);
      handleSendEmail(data);
      res.status(201).json({msg:"User and Turn created", status:true});
    } else if (cont.length < 10) {
      await turnModel.create(newTurn);
      await customerModel.updateOne(
        { identificationNumber: body.identificationNumber },
        {
          $push: {
            turnHistory: [{ registry: dateSis, timeSlot: hourSis}],
          },
        }
      );
      handleSendEmail(data);
      res.status(201).json({msg:"Turn created", status:true});
    } else {
      res.status(404).json({msg:"Turns not available for this time ", status:false});
    }
  } catch (error) {
    handleHttpError(res, "Internal Server Error", 400, "createTurn", error);
  }
};

/**
 * Modify Turn-status in DataBase
 * @param {*} req
 * @param {*} res
 */
const modifyTurn = async (req, res) => {
  try {
    const id = req.params.id.toString();
    await turnModel.updateOne({ _id: id }, { status: false });
    const find = await turnModel.findById(id);
    res.status(200).send("Turn update: " + find);
  } catch (error) {
    handleHttpError(res, "Internal Server Error", 500, "modifyTurn", error);
  }
};

module.exports = {
  getTurn,
  getAllTurns,
  createTurn,
  modifyTurn,
  getTurnByDI,
  getTurnByHour
};
