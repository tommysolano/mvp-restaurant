const mongoose = require('mongoose');

const tableSchema = mongoose.Schema({
    tableId: { type: String, required: true, unique: true }, // Unique table identifier
    name: { type: String, required: true },                 // Friendly table name (e.g., "Table 1")
});

module.exports = mongoose.model('Table', tableSchema);
