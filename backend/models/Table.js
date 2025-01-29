const mongoose = require('mongoose');

const tableSchema = mongoose.Schema({
    tableId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    qrCode: { type: String } // Store the generated QR code URL or base64 data
});

module.exports = mongoose.model('Table', tableSchema);
