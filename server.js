const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.static('client/build'));

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
            // if (client.readyState === WebSocket.OPEN) {
                    const dataToSend = JSON.stringify({ user: 'User', text: message });
                client.send(dataToSend);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
