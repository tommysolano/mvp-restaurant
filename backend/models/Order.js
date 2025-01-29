const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    tableId: { type: String, required: true },      // Links the order to a specific table
    items: [                                        // List of ordered items
        {
            name: { type: String, required: true }, // Name of the menu item
            quantity: { type: Number, required: true }, // Quantity ordered
            price: { type: Number, required: true },    // Price per item
        },
    ],
    totalPrice: { type: Number, required: true },   // Total cost of the order
    status: { type: String, default: 'pending' },   // Status (e.g., pending, completed)
    createdAt: { type: Date, default: Date.now },   // Timestamp of the order
});

module.exports = mongoose.model('Order', orderSchema);
