const express = require('express');
const Order = require('../models/Order'); // Import the Order model
const router = express.Router();

// GET: Fetch all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find(); // Fetch all orders from the database
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST: Create a new order
router.post('/', async (req, res) => {
    try {
        const { tableId, items, totalPrice } = req.body; // Extract order details from the request
        const newOrder = await Order.create({ tableId, items, totalPrice }); // Save the order in the database
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PATCH: Update the status of an order
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract the order ID from the URL
        const { status } = req.body; // Extract the new status from the request
        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true }); // Update the order status
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
