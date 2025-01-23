const express = require('express');
const UsersService = require('../services/UsersService');
const userController = express.Router();

const usersService = new UsersService();

userController.post('/user', usersService.daftarUser);
userController.post('/user/login', usersService.login);

module.exports = userController;