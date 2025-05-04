const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const contactRoutes = require('./routes/contact');
const employeeRoutes = require('./routes/employeeRoutes');
const productionRoutes = require('./routes/productionRoutes');
const designerRoutes = require('./routes/designerRoutes');
const designRoutes = require('./routes/designRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// MongoDB connection
const mongoUri = process.env.MONGO_URL;
mongoose.connect(mongoUri)
  .then(() => {
    console.log(`✅ Connected to MongoDB`);
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/productions', productionRoutes);
app.use('/api/designers', designerRoutes);
app.use('/api/designs', designRoutes);
app.use('/api', authRoutes); // for login and register

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
