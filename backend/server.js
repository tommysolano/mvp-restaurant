const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const { init } = require('./sockets/socket'); // Import WebSocket initialization

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // Create an HTTP server

app.use(cors());
app.use(bodyParser.json());

// Import routes
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const tableRoutes = require('./routes/tableRoutes');

app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tables', tableRoutes);

// Initialize Socket.IO
init(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
