const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subTotal: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;