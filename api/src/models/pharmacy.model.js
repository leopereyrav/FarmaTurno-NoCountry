const mongoose = require("mongoose");

const PharmacySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    surName: {
      type: String,
      require: true,
    },
    identificationNumber: {
      type: Number,
      unique: true,
      require: true,
    },
    companyName: {
      type: String,
      unique: true,
      require: true,
    },
    nit: {
      type: String,
      unique: true,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    hourAttention: {
      type: String,
      require: true
    },
    userName: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("pharmacy", PharmacySchema);
