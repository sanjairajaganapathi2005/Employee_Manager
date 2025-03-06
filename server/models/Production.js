const mongoose = require('mongoose');

const ProductionSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  EmpName: {
    type: String,
    ref: 'Employee',
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  amount: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Production', ProductionSchema);