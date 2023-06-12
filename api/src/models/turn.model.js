const mongoose = require('mongoose');
const moment = require('moment');
const { dateFormat } = require('../utils/handleDate');

const dateSis = dateFormat();

const turnSchema = new mongoose.Schema(

  {
    date: {
      type: String,
      default: dateSis,
    },
    status: {
      type: Boolean,
      default: true,
    },
    timeSlot: {
      type: String,
      require: true
    },
    customer: {
      customerId: {
        type: mongoose.Types.ObjectId
      },
      name: {
        type: String
      },
      surName: {
        type: String
      },
      identificationNumber: {
        type: Number,
        require: true
      },
      customerEmail: {
        type: String,
        require: true
      }
    }
  },
  {
    timestamps: true,
    versionKey: false
    
  }

);


module.exports = mongoose.model('turn', turnSchema);