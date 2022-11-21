const express = require('express');
const cors = require('cors');

const { checkAuth, checkJson, handleInvalidPath } = require('./middleware');

const app = express();

app.use(cors());
app.use(checkJson);

app.get('/', (req, res) => {
    res.send({ message: 'Server Running ...' });
});

app.use('/api/todo', checkAuth, require('./apps/todo/todo.routes'));
app.use('/api/auth', require('./apps/auth/auth.routes'));
app.use('/api/user', checkAuth, require('./apps/user/user.routes'));

app.use(handleInvalidPath);

module.exports = { app };
