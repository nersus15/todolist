const express = require('express');
const verifyToken = require('../middlewares/authMiddleware');
const TasksService = require('../services/TasksService');
const taskConstroller = express.Router();

const taskService = new TasksService();

taskConstroller.get('/tasks', verifyToken,  taskService.getAllTasks);
taskConstroller.get('/tasks/shared', verifyToken,  taskService.getSharedTasks);
taskConstroller.get('/tasks/my', verifyToken,  taskService.getMyTasks);
taskConstroller.get('/task/:id', verifyToken,  taskService.getTask);
taskConstroller.put('/task/:id', verifyToken,  taskService.updateTask);
taskConstroller.delete('/task/:id', verifyToken,  taskService.deleteTask);
taskConstroller.post('/task', verifyToken, taskService.createNew);
taskConstroller.post('/task/:id/status', verifyToken, taskService.changeStatus);

module.exports = taskConstroller;