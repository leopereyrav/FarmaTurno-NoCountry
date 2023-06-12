const mongoose = require('mongoose');
const moment = require('moment');


const LogSchema = new mongoose.Schema(
  {
    Data: {
      type: Object,
      require: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('log', LogSchema);