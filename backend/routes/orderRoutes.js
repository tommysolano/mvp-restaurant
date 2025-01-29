const express = require('express');
const Order = require('../models/Order');
const router = express.Router();
const { getIO } = require('../sockets/socket'); // Import WebSocket instance

// GET: Fetch all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST: Create a new order
router.post('/', async (req, res) => {
    try {
        const { tableId, items, totalPrice } = req.body;
        const newOrder = await Order.create({ tableId, items, totalPrice });

        // Emit "newOrder" event to all connected clients
        const io = getIO();
        io.emit('newOrder', newOrder);

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PATCH: Update order status
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });

        // Emit "orderUpdated" event when order status changes
        const io = getIO();
        io.emit('orderUpdated', updatedOrder);

        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
