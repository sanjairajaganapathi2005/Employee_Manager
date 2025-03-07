const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Employee = require('./models/Employee');
const Production = require('./models/Production');
const Designer = require('./models/Designer');
const Design = require('./models/Design');
const User = require('./models/User');
const bcrypt = require('bcryptjs');  
const validator = require('validator');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();

app.use(express.json());

app.use(cors());
const mongoUri = `${process.env.MONGO_URL}/${process.env.DB_NAME}`;

mongoose.connect(mongoUri)
.then(() => {
  console.log(`Connected to MongoDB database: ${process.env.DB_NAME}`);
  console.log("The assigned port is:", process.env.PORT);
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
  console.log("The assigned port is:", process.env.PORT);
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

// Add a new employee
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

// Get all productions by employee ID
app.get('/api/productions/:employeeId', async (req, res) => {
  try {
    const productions = await Production.find({ employeeId: req.params.employeeId });
    res.json(productions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new production
app.post('/api/productions', async (req, res) => {
  const { employeeId, timestamp, description, count, amount, total } = req.body;

  try {
    // Fetch employee details to get the employee's name
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Create a new production record with the employee's name
    const production = new Production({
      employeeId,
      EmpName: employee.name, 
      timestamp,
      description,
      count,
      amount,
      total,
    });

    const newProduction = await production.save();
    res.status(201).json(newProduction);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});


// Update a production
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




  function handleError(res, statusCode, message) {
    return res.status(statusCode).json({ error: message });
  }

  //login
  app.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) { 
        return res.status(400).send('Email and password are required');
      }
  
      const user = await User.findOne({
          email: email,
        });
  
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(404).send("Invalid credentials");
      }
  
      const token = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '12hr' }
      );
  
      return res.status(200).send({ message: "Login successful", token: token });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
  });
  

  


//register
  app.post('/api/register', async (req, res) => {
    const { email, password, confirmPassword } = req.body;
   
    if (!email || !password || !confirmPassword) {
      return handleError(res, 400, 'Please provide email, password, and confirm password.');
    }
  
    if (password !== confirmPassword) {
      return handleError(res, 400, 'Passwords do not match');
    }
  
    const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~]).{8,}$/;
    if (!passwordStrengthRegex.test(password)) {
      return handleError(res, 400, 'Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.');
    }

    if (!validator.isEmail(email)) {
      return handleError(res, 400, 'Invalid email format');
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return handleError(res, 400, 'User already exists');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword });
      await user.save();
  
      res.status(201).json({ message: 'User registered successfully', success: true });
    } catch (error) {
      console.error('Error during user registration:', error);
      handleError(res, 500, 'Error registering user, please try again later.');
    }
  });
  



app.listen(PORT, () => {
  console.log('Server is running ');
});
