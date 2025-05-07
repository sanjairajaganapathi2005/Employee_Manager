const express = require('express');
const router = express.Router();
const Production = require('../models/Production');

// Route: GET /api/weekly-report?year=2025&week=18
router.get('/', async (req, res) => {
  const { year, week } = req.query;

  if (!year || !week) {
    return res.status(400).json({ error: 'Year and week are required' });
  }

  try {
    const report = await Production.aggregate([
      {
        $addFields: {
          week: { $isoWeek: { $toDate: "$timestamp" } },
          year: { $year: { $toDate: "$timestamp" } }
        }
      },
      {
        $match: {
          week: parseInt(week),
          year: parseInt(year)
        }
      },
      {
        $group: {
          _id: {
            EmpName: "$EmpName",
            description: "$description"
          },
          totalCount: { $sum: "$count" },
          totalValue: { $sum: "$total" }
        }
      }
    ]);

    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
