const express = require('express');
const cors = require('cors');

const { checkAuth, checkJson, handleInvalidPath } = require('./middleware');

const app = express();

app.use(cors());
app.use(checkJson);

app.get('/', (req, res) => {
    res.send({ message: 'Server Running ...' });
});

app.use('/api/note', checkAuth, require('./apps/note/routes'));
app.use('/api/user', require('./apps/user/routes'));

app.use(handleInvalidPath);

module.exports = { app };
