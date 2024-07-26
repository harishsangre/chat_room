const http = require('http');
const app = require('./src/app');
const { Server } = require('socket.io');
const prisma = require('./src/config/db');

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    socket.on('joinRoom', ({ username, room }) => {
        console.log(username, room)
        socket.join(room);
        socket.to(room).emit('message', { user: 'admin', text: `${username} has joined the room.` });
        console.log(`${username}`, 'has joined the room')
    });

    socket.on('chatMessage', ({ room, message, username }) => {
        io.to(room).emit('message', { user: username, text: message });
    });

    socket.on('leaveRoom', ({ username, room }) => {
        // try {
            
            console.log(username, room, 'User is leaving the room');
    
            // Make the socket leave the specified room
            socket.leave(room);
    
            // // Notify other users in the room
            socket.to(room).emit('message', { user: 'admin', text: `${username} has left the room.` });
    
            console.log(`${username} has left the room`);
        // } catch (error) {
            // console.log(error)
        // }
    });
});

app.use((req, res, next) => {
    req.io = io;
    next();
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
