const socketIo = require('socket.io');
const Message = require('../models/message.model');

module.exports = function (server) {
    const io = socketIo(server, {
        cors: {
            origin: '*',
        },
        pingTimeout: 60000,
    });

    const users = {};

    io.on('connection', (socket) => {
        socket.on('new-user', (username) => {
            users[socket.id] = username;
        });

        socket.on('send-message', async (data) => {
            const { message, receiver, sender } = data;
            // console.log(data);
            const newMessage = new Message({
                sender,
                receiver,
                message,
            });
            await newMessage.save();
            io.emit('receive-message', { message, sender });
        });

        socket.on('disconnect', () => {
            delete users[socket.id];
        });
    });

    return io;
};
