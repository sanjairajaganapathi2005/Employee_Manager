const express = require('express');
const router = express.Router();
const Production = require('../models/Production');
const Employee = require('../models/Employee');

// Get all productions by employee ID
router.get('/:employeeId', async (req, res) => {
  try {
    const productions = await Production.find({ employeeId: req.params.employeeId });
    res.json(productions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new production
router.post('/', async (req, res) => {
  const { employeeId, timestamp, design, description, count, amount, total } = req.body;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const production = new Production({
      employeeId,
      EmpName: employee.name,
      timestamp,
      design,
      description,
      count,
      amount,
      total,
    });

    const newProduction = await production.save();
    res.status(201).json(newProduction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a production
router.put('/:id', async (req, res) => {
  try {
    const production = await Production.findById(req.params.id);
    if (!production) return res.status(404).json({ message: 'Production not found' });

    Object.assign(production, req.body);
    const updated = await production.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
