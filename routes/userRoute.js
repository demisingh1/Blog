const express = require('express');
const { CreateUser, showUsers, signUser } = require('../controller/Authcontroller');
const route = express.Router()

route.get('/api/user',showUsers);
route.post('/api/user',CreateUser);
route.get('/api/user/signin',signUser)

module.exports = route;