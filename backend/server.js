const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const menuRoutes = require('./routes/menuRoutes'); // Import menu routes
const orderRoutes = require('./routes/orderRoutes'); // Import order routes
const tableRoutes = require('./routes/tableRoutes'); // Import table routes

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Root route for testing
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.use('/api/menu', menuRoutes); // Mount the routes at /api/menu
app.use('/api/orders', orderRoutes); // Mount the routes at /api/orders
app.use('/api/tables', tableRoutes); // Mount the routes at /api/tables

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




