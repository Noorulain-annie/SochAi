const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('✅ Client connected');

    // When the client sends a message
    ws.on('message', (message) => {
        console.log(`📩 Received: ${message}`);

        // Simulate AI response after 1 second
        setTimeout(() => {
            const response = `🤖 AI says: ${message}`;
            console.log(`💬 Sending: ${response}`);
            ws.send(response);
        }, 1000);
    });

    // Handle client disconnect
    ws.on('close', () => console.log('❌ Client disconnected'));
});

server.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));


// const express = require('express');
// const { WebSocketServer } = require('ws');
// const axios = require('axios');
// const cors = require('cors');

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// // HTTP server
// app.get('/', (req, res) => res.send('Backend is running 🚀'));

// // Start HTTP server
// const server = app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// // WebSocket setup
// const wss = new WebSocketServer({ server });

// wss.on('connection', (ws) => {
//     console.log('Frontend connected');

//     ws.on('message', async (message) => {
//         const prompt = message.toString();
//         console.log(`Prompt received: ${prompt}`);

//         try {
//             const response = await axios.post(
//                 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCOY0zrY76EVrW8TldTUkPCuXF5oec8Qv4',
//                 {
//                     contents: [{ parts: [{ text: prompt }] }],
//                 },
//                 { responseType: 'stream' }
//             );

//             // Stream AI response to the frontend in chunks
//             response.data.on('data', (chunk) => {
//                 ws.send(chunk.toString());
//             });

//             response.data.on('end', () => {
//                 ws.send('[END]');
//                 ws.close();
//             });

//         } catch (error) {
//             console.error('Error generating response:', error);
//             ws.send('Error generating response.');
//             ws.close();
//         }
//     });

//     ws.on('close', () => console.log('Frontend disconnected'));
// });
