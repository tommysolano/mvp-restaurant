const { io } = require('socket.io-client');

const SERVER_URL = process.env.SERVER || "http://localhost:5000"; // Default to local if not set
const socket = io(SERVER_URL); // Use env variable

socket.on('connect', () => {
    console.log(`Connected to WebSocket server: ${socket.id}`);
});

socket.on('newOrder', (order) => {
    console.log('🔴 New order received:', order);
});

socket.on('orderUpdated', (order) => {
    console.log('🟢 Order updated:', order);
});

socket.on('disconnect', () => {
    console.log('❌ Disconnected from WebSocket server');
});
