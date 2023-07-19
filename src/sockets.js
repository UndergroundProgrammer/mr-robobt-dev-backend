const { Server } = require('socket.io');
const { createVisitor } = require('./services/visitors.service');
const geoip = require('geoip-lite');
const { getName } = require('country-list');
const config = require('./config/config');
let io;
let activeUsers = [];
let activeStaff = [];
let liveVisitors = [];

function createSocketsServer(server) {
    if (!io) {
        io = new Server(server, {
            cors: '*',
        });
    }
    io.on('connection', async (socket) => {
        if (!liveVisitors.some((user) => user.socketId === socket.id)) {
            const ip =
                socket.handshake.headers['x-forwarded-for'] ||
                socket.handshake.headers['X-Real-IP'] ||
                socket.handshake.address ||
                'UNKNOWN';
            const geo = geoip.lookup(ip);
            const country = geo ? getName(geo.country) : 'UNKNOWN';
            try {
                const newuser = await createVisitor({
                    ipAddress: ip,
                    country: country,
                });

                liveVisitors.push({
                    userId: newuser.id,
                    socketId: socket.id,
                });
            } catch (error) {}
        }

        // add new User
        socket.on('new-user-add', (newUserId, staffSockrtId) => {
            if (
                newUserId &&
                !activeUsers.some((user) => user.userId === newUserId)
            ) {
                // if user is not added previously
                activeUsers.push({
                    userId: newUserId,
                    socketId: socket.id,
                });
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
                activeStaff.push({
                    userId: newUserId,
                    socketId: socket.id,
                });
            }
            io.emit('get-staff', activeStaff);
        });
        socket.on('get-staff-user', () => {
            if (activeStaff.length > 0) {
                const number =
                    Math.floor(Math.random() * activeStaff.length) + 0;
                io.emit('online-staff-user', activeStaff[number]);
            } else {
                io.emit('online-staff-user', null);
            }
        });

        socket.on('disconnect', () => {
            // remove user from active users
            activeUsers = activeUsers.filter(
                (user) => user.socketId !== socket.id
            );
            activeStaff = activeStaff.filter(
                (user) => user.socketId !== socket.id
            );
            liveVisitors = liveVisitors.filter(
                (user) => user.socketId !== socket.id
            );
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
            const user = activeUsers.find(
                (usera) => usera.userId === receiverId
            );
            if (user) {
                io.to(user.socketId).emit('receive-message', data);
            }
        });
        socket.on('send-message-staff', async (receiverId, data) => {
            const user = activeStaff.find(
                (usera) => usera.userId === receiverId
            );
            if (user) {
                io.to(user.socketId).emit('receive-message', data);
            }
        });
        socket.on('get-online-users', async () => {
            socket.emit('online-staff-users', activeStaff);
            socket.emit('online-users', activeUsers);
        });
    });
}
function getActiveUsers() {
    return liveVisitors;
}
function sendApprovalNotification() {
    const userid =
        config.env == 'development'
            ? '6478cdee95c35994c1c63d0d'
            : '649ac5f54b443df44423c59c';
    const user = activeStaff.find((usera) => usera.userId === userid);
    if (user) {
        io.to(user.socketId).emit('signup-approval');
    }
}
module.exports = {
    getActiveUsers,
    createSocketsServer,
    sendApprovalNotification,
};
