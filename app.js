// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
// user - Ashwatthama
// password - n3mRPP1JKVnpmmQi
mongoose.connect('mongodb+srv://Ashwatthama:n3mRPP1JKVnpmmQi@cluster0.dxge6ru.mongodb.net/restAPI', 
{
  useNewUrlParser: true,  
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});

app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/orders', require('./routes/order'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
