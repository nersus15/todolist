const express = require('express');
const verifyToken = require('../middlewares/authMiddleware');
const TasksService = require('../services/TasksService');
const collabsController = express.Router();

const taskService = new TasksService();

collabsController.get('/task/:id/sharing', verifyToken,  taskService.getShared);
collabsController.post('/task/:id/share', verifyToken,  taskService.shareTask);
collabsController.delete('/task/:id/sharing/:user', verifyToken,  taskService.deleteShare);

module.exports = collabsController;