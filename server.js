const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let currentColor = 'white';

wss.on('connection', (ws) => {
    ws.send(JSON.stringify({ color: currentColor }));

    ws.on('message', (data) => {
        const parsedData = JSON.parse(data);
        currentColor = parsedData.color;
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ color: currentColor }));
            }
        });
    });
});
