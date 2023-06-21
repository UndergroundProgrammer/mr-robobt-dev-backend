const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const chat = require('./chat.route');
const contact = require('./contact.route');
const pricingItem = require('./pricingitems.route');
const blogRoute = require('./blog.route');
const permissionRoute = require('./permission.route');
const visitorRoute = require('./visitor.route');
const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/users',
        route: userRoute,
    },
    {
        path: '/chat',
        route: chat,
    },
    {
        path: '/contactus',
        route: contact,
    },
    {
        path: '/pricingitems',
        route: pricingItem,
    },
    {
        path: '/blogs',
        route: blogRoute,
    },
    {
        path: '/permissions',
        route: permissionRoute,
    },
    {
        path: '/visitors-location',
        route: visitorRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;