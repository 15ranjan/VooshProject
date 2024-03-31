// routes/orders.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const Order = require('../models/order');

// Add new order
router.post('/add', auth, async (req, res) => {
  try {
    const { subTotalVal } = req.body;
    
    console.log(subTotalVal);
    // Create new order
    const newOrder = new Order({
      user: req.user,
      subTotal: 200
    });

    // Save order to database
    await newOrder.save();

    res.status(201).json({ message: 'Order added successfully', Order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get order details for a user
router.get('/get', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user }).populate('user', ['name', 'phoneNumber']);
    console.log(orders);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
