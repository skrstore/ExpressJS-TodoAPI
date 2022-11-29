const express = require('express');
const cors = require('cors');

const middleware = require('./shared/middleware');

const app = express();

app.use(cors());
app.use(middleware.checkJson);

// NOTE: Request logging library - morgan - https://www.npmjs.com/package/morgan
app.use(middleware.logRequest);
app.get('/', middleware.handleRoot);

app.use('/todo', middleware.checkAuth, require('./apps/todo/todo.routes'));
app.use('/auth', require('./apps/auth/auth.routes'));
app.use('/user', middleware.checkAuth, require('./apps/user/user.routes'));

app.use(middleware.handleInvalidPath);
app.use(middleware.handleError);

// TODO: Look for Swagger or Postman Docs Usage for API Documentation

module.exports = { app };
