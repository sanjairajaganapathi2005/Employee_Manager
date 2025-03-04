const mongoose = require("mongoose");

const DesignerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Designer", DesignerSchema);