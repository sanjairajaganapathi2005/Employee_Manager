const express = require('express');
const router = express.Router();
const Design = require('../models/Design');
const Designer = require('../models/Designer');

// Add new design
router.post('/', async (req, res) => {
  const { designerId, date, coloursales, person, count } = req.body;

  try {
    const designer = await Designer.findById(designerId);
    if (!designer) return res.status(404).json({ message: "Designer not found" });

    const design = new Design({
      designerId,
      designName: designer.name,
      date,
      coloursales,
      person,
      count,
    });

    const newDesign = await design.save();
    res.status(201).json(newDesign);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get designs by designer ID
router.get('/:designerId', async (req, res) => {
  try {
    const designs = await Design.find({ designerId: req.params.designerId });
    res.json(designs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update design
router.put('/:id', async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);
    if (!design) return res.status(404).json({ message: 'Design not found' });

    Object.assign(design, req.body);
    const updated = await design.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
