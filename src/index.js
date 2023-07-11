const mongoose = require('mongoose');
const { Server } = require('socket.io');
const http = require('http');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const { chatService } = require('./services');

const server = http.createServer(app);
const port = process.env.PORT || config.port;
mongoose.set('strictQuery', false);
mongoose
    .connect(config.mongoose.url, config.mongoose.options)
    .then(async () => {
        logger.info('Connected to MongoDB');

        server.listen(port, () => {
            logger.info(`Listening to port ${port}`);
        });
    });

const io = new Server(server, {
    cors: '*',
});
let activeUsers = [];
let activeStaff = [];

io.on('connection', (socket) => {
    // add new User
    socket.on('new-user-add', (newUserId, staffSockrtId) => {
        if (
            newUserId &&
            !activeUsers.some((user) => user.userId === newUserId)
        ) {
            // if user is not added previously
            activeUsers.push({ userId: newUserId, socketId: socket.id });
        }

        // send all active users to new user
        io.emit('get-users', activeUsers);
        io.emit('get-staff', activeStaff);
        io.to(staffSockrtId).emit('new-conversation', () => {});
    });
    socket.on('new-staff-add', (newUserId) => {
        if (
            newUserId &&
            !activeStaff.some((user) => user.userId === newUserId)
        ) {
            // if user is not added previously
            activeStaff.push({ userId: newUserId, socketId: socket.id });
        }
        io.emit('get-staff', activeStaff);
    });
    socket.on('get-staff-user', () => {
        if (activeStaff.length > 0) {
            const number = Math.floor(Math.random() * activeStaff.length) + 0;
            io.emit('online-staff-user', activeStaff[number]);
        } else {
            io.emit('online-staff-user', null);
        }
    });

    socket.on('disconnect', () => {
        // remove user from active users
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        activeStaff = activeStaff.filter((user) => user.socketId !== socket.id);
        // send all active users to all users
        io.emit('get-users', activeUsers);
        io.emit('get-staff', activeStaff);
    });

    socket.on('forceDisconnect', (userId) => {
        // remove user from active users
        activeStaff = activeStaff.filter((user) => user.userId !== userId);

        // send all active users to all users
        io.emit('get-staff', activeStaff);
    });
    // send message to a specific user
    socket.on('send-message', async (receiverId, data) => {
        const user = activeUsers.find((usera) => usera.userId === receiverId);
        if (user) {
            io.to(user.socketId).emit('receive-message', data);
        }
    });
    socket.on('send-message-staff', async (receiverId, data) => {
        const user = activeStaff.find((usera) => usera.userId === receiverId);
        if (user) {
            io.to(user.socketId).emit('receive-message', data);
        }
    });
    socket.on('get-online-users', async () => {
        socket.emit('online-staff-users', activeStaff);
        socket.emit('online-users', activeUsers);
    });
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});
