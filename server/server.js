const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Employee = require('./models/Employee');
const Production = require('./models/Production');
const Designer = require('./models/Designer');
const Design = require('./models/Design');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/productionApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/employees', async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/productions/:employeeId', async (req, res) => {
  try {
    const productions = await Production.find({ employeeId: req.params.employeeId });
    res.json(productions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/productions', async (req, res) => {
  const production = new Production({
    employeeId: req.body.employeeId,
    timestamp: req.body.timestamp,
    description: req.body.description,
    count: req.body.count,
    amount: req.body.amount,
    total: req.body.total,
  });

  try {
    const newProduction = await production.save();
    res.status(201).json(newProduction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/productions/:id', async (req, res) => {
  try {
    const production = await Production.findById(req.params.id);
    if (production) {
      production.timestamp = req.body.timestamp || production.timestamp;
      production.description = req.body.description || production.description;
      production.count = req.body.count || production.count;
      production.amount = req.body.amount || production.amount;
      production.total = req.body.total || production.total;

      const updatedProduction = await production.save();
      res.json(updatedProduction);
    } else {
      res.status(404).json({ message: 'Production not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});





// Add a new designer
app.post("/api/designers", async (req, res) => {
    const { name } = req.body;
    const designer = new Designer({ name });
  
    try {
      const newDesigner = await designer.save();
      res.status(201).json(newDesigner);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Get all designers
  app.get("/api/designers", async (req, res) => {
    try {
      const designers = await Designer.find();
      res.json(designers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Add a new design
  app.post("/api/designs", async (req, res) => {
    const { designerId, date, coloursales, person, count } = req.body; 
  
    try {
      const designer = await Designer.findById(designerId);
      if (!designer) {
        return res.status(404).json({ message: "Designer not found" });
      }
  
      const design = new Design({
        designerId, designName: designer.name, 
        date, coloursales, person, count,
      });
  
      const newDesign = await design.save();
      res.status(201).json(newDesign);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

  
  // Get designs by designer ID
  app.get("/api/designs/:designerId", async (req, res) => {
    try {
      const designs = await Design.find({ designerId: req.params.designerId });
      res.json(designs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Update a design
  app.put("/api/designs/:id", async (req, res) => {
    try {
      const design = await Design.findById(req.params.id);
      if (design) {
        design.date = req.body.date || design.date;
        design.coloursales = req.body.coloursales || design.coloursales;
        design.person = req.body.person || design.person;
        design.count = req.body.count || design.count;
  
        const updatedDesign = await design.save();
        res.json(updatedDesign);
      } else {
        res.status(404).json({ message: "Design not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});