const express = require('express');
const cors = require('cors');

const { checkAuth, checkJson, handleInvalidPath } = require('./middleware');

const app = express();

app.use(cors());
app.use(checkJson);

// NOTE: Request logging library - morgan - https://www.npmjs.com/package/morgan
app.use((req, res, next) => {
    console.log(`${req.hostname} : ${req.method} : ${req.path}`);
    next();
});

app.get('/', (req, res) => {
    res.send({
        message: `Server :: ${config.name}`,
        version: config.version,
    });
});

app.use('/api/todo', checkAuth, require('./apps/todo/todo.routes'));
app.use('/api/auth', require('./apps/auth/auth.routes'));
app.use('/api/user', checkAuth, require('./apps/user/user.routes'));

app.use(handleInvalidPath);
app.use(handleError);

// TODO: Look for Swagger or Postman Docs Usage for API Documentation

const handleError = (error, req, res, next) => {
    // TODO: Explore more on - https://expressjs.com/en/guide/error-handling.html
    console.log('[handleError] ', error.message);
    return res.status(500).send({
        message: error.message,
        status: 'fail',
    });
};

module.exports = { app };
