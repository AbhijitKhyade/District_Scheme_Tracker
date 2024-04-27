const socketIo = require('socket.io');
const Message = require('../models/message.model');

module.exports = function (server) {
    const io = socketIo(server, {
        cors: {
            origin: '*',
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected');

        // Handle new messages
        socket.on('newMessage', async (data) => {
            try {
                const { sender, receiver, message } = data;
                const newMessage = new Message({ sender, receiver, message });
                await newMessage.save();
                io.emit('newMessage', newMessage);
            } catch (error) {
                console.error('Error saving message:', error);
            }
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    return io;
};
