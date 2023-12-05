const express = require('express');
const { CreateUser, showUsers, signUser, logout, SingleUser } = require('../controller/Authcontroller');
const { auth } = require('../middlewares/auth');
const route = express.Router()

route.get('/api/allusers',showUsers);
route.post('/api/user',CreateUser);
route.post('/api/user/signin',signUser)
route.get('/api/user/logout',logout)
route.get('/api/singleuser',auth,SingleUser)

module.exports = route;