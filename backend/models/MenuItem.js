const mongoose = require('mongoose');

const menuItemSchema = mongoose.Schema({
    name: { type: String, required: true },          // Menu item name
    price: { type: Number, required: true },         // Price of the item
    description: { type: String },                   // Optional: Item description
    category: { type: String },                      // Optional: Item category (e.g., "Main Course")
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
