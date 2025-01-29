const { io } = require('socket.io-client');

const socket = io('http://localhost:5000'); // Connect to the local WebSocket server

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
