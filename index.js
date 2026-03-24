const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    // Lắng nghe khi có người gửi tin nhắn kèm nickname
    socket.on('chat message', (data) => {
        // data bây giờ là một object: { name: "Tên", msg: "Nội dung" }
        io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
        console.log('Một người dùng đã thoát');
    });
});

http.listen(3000, () => {
    console.log('Server chạy tại http://localhost:3000');
});