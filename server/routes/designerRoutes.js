const express = require('express');
const router = express.Router();
const Designer = require('../models/Designer');

// Add new designer
router.post('/', async (req, res) => {
  const designer = new Designer({ name: req.body.name });

  try {
    const newDesigner = await designer.save();
    res.status(201).json(newDesigner);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all designers
router.get('/', async (req, res) => {
  try {
    const designers = await Designer.find();
    res.json(designers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
