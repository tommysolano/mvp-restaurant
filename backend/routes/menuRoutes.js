const express = require('express');
const MenuItem = require('../models/MenuItem'); // Import the MenuItem model
const router = express.Router();

// Route to fetch all menu items
router.get('/', async (req, res) => {
    try {
        const menu = await MenuItem.find(); // Fetch all menu items
        res.json(menu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to add a new menu item
router.post('/', async (req, res) => {
    try {
        const { name, price, description, category } = req.body; // Extract data from request
        const newItem = await MenuItem.create({ name, price, description, category }); // Create a new menu item
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
