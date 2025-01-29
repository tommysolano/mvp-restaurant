const express = require('express');
const Table = require('../models/Table');
const QRCode = require('qrcode'); // Import QR code library
const router = express.Router();

// POST: Create a new table and generate a QR code
router.post('/', async (req, res) => {
    try {
        const { tableId, name } = req.body;
        
        // Generate a QR Code URL that directs to the table's menu
        const qrCodeURL = `http://localhost:3000/menu/${tableId}`; // Replace with frontend URL
        const qrCodeData = await QRCode.toDataURL(qrCodeURL); // Generate QR Code as base64

        // Save the table with the generated QR code
        const newTable = await Table.create({ tableId, name, qrCode: qrCodeData });

        res.status(201).json(newTable);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET: Fetch all tables (including their QR codes)
router.get('/', async (req, res) => {
    try {
        const tables = await Table.find();
        res.json(tables);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
