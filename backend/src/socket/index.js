import { Server } from 'socket.io';

let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: { origin: '*' }
    });

    io.on('connection', (socket) => {
        console.log('Socket connected:', socket.id);

        socket.on('join', (userId) => {
            socket.join(userId)
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });
    });
};

export const getIO = () => {
    if (!io) throw new Error('Socket not initialized');
    return io;
};
