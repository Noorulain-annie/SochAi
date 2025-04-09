const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const axios = require('axios');

const app = express();
const PORT = 5000;

let posts = [];

app.use(cors());
app.use(express.json());

app.get('/api/posts', (req, res) => {
    res.json(posts);
});

app.post('/api/posts', (req, res) => {
    const postData = {
        id: Date.now(),
        ...req.body,
        timeAgo: 'Just now',
        likes: 0,
        dislikes: 0,
        comments: 0,
        shares: 0,
        saved: false,
    };
    posts = [postData, ...posts];
    res.status(201).json(postData);
});

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// WebSocket Server
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', async (message) => {
        const userMessage = message.toString();
        console.log('Received:', userMessage);

        ws.send(JSON.stringify({ type: 'typing', data: true }));

        try {
            const response = await axios.post(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCOY0zrY76EVrW8TldTUkPCuXF5oec8Qv4',
                {
                    contents: [{ parts: [{ text: userMessage }] }],
                },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const aiResponse = response.data.candidates[0].content.parts[0].text;
            const words = aiResponse.split(' ');
            for (let i = 0; i < words.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 10));
                ws.send(JSON.stringify({
                    type: 'message',
                    data: words.slice(0, i + 1).join(' ')
                }));
            }

            ws.send(JSON.stringify({ type: 'typing', data: false }));
        } catch (error) {
            console.error('Error:', error);
            ws.send(JSON.stringify({
                type: 'error',
                data: 'Failed to get response from AI.'
            }));
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server running on ws://localhost:8080');

