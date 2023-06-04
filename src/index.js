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
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    logger.info('Connected to MongoDB');

    server.listen(port, () => {
        logger.info(`Listening to port ${port}`);
    });
});

const io = new Server(server, {
    cors: '*',
});
let activeUsers = [];

io.on('connection', (socket) => {
    // add new User
    socket.on('new-user-add', (newUserId) => {
        // if user is not added previously
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({ userId: newUserId, socketId: socket.id });
        }
        // send all active users to new user
        io.emit('get-users', activeUsers);
    });

    socket.on('disconnect', () => {
        // remove user from active users
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);

        // send all active users to all users
        io.emit('get-users', activeUsers);
    });

    socket.on('forceDisconnect', (userId) => {
        // remove user from active users
        activeUsers = activeUsers.filter((user) => user.userId !== userId);

        // send all active users to all users
        io.emit('get-users', activeUsers);
    });
    // send message to a specific user
    socket.on('send-message', async (receiverId, chatId, count, data) => {
        const user = activeUsers.find((usera) => usera.userId === receiverId);
        try {
            await chatService.updateUnreadCount(chatId, count);
        } catch (error) {
            console.log(error);
        }
        if (user) {
            io.to(user.socketId).emit('receive-message', data);
        }
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
