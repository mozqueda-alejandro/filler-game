const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const ws = new WebSocket('ws://localhost:8080');

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    drawCanvas(data.color);
};

function changeColor() {
    const selectedColor = document.getElementById('colorSelect').value;
    ws.send(JSON.stringify({ color: selectedColor }));
}

function drawCanvas(color) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}