const express = require('express');
const userController = require('./controllers/Users');
const taskConstroller = require('./controllers/Tasks');
const collabsController = require('./controllers/Collaborations');
const commentsController = require('./controllers/Comments');
require('dotenv').config();

const app = express();
app.use(express.json());
// REGISTER ROUTES
app.use(userController);
app.use(taskConstroller);
app.use(collabsController);
app.use(commentsController);

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});