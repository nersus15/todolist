const express = require('express');
const verifyToken = require('../middlewares/authMiddleware');
const TasksService = require('../services/TasksService');
const commentsController = express.Router();

const taskService = new TasksService();

commentsController.get('/task/:id/comments', verifyToken,  taskService.getComments);
commentsController.post('/task/:id/comments', verifyToken, taskService.commentTask);
commentsController.delete('/task/:id/comment/:commentid', verifyToken, taskService.deleteComment);
module.exports = commentsController;