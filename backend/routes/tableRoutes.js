const express = require('express');
const Table = require('../models/Table'); // Import the Table model
const router = express.Router();

// GET: Fetch all tables
router.get('/', async (req, res) => {
    try {
        const tables = await Table.find(); // Fetch all tables from the database
        res.json(tables);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST: Add a new table
router.post('/', async (req, res) => {
    try {
        const { tableId, name } = req.body; // Extract table details from the request
        const newTable = await Table.create({ tableId, name }); // Save the table in the database
        res.status(201).json(newTable);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
