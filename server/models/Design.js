const mongoose = require("mongoose");

const DesignSchema = new mongoose.Schema({
  designerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Designer",
    required: true,
  },
  designName: {
    type: String,
    ref: "Designer",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  coloursales: {
    type: String,
    required: true,
  },
  person: {
    type: String,
    required: false,
  },
  count: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Design", DesignSchema);
