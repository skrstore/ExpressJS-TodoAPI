const express = require('express');
const { sign } = require('jsonwebtoken');

const User = require('./models');
const { checkAuth } = require('../../middleware');
const { JWT_SECRET } = require('./../../config');

const router = express.Router();

router.get('/', checkAuth, async (req, res) => {
    const { _id: id } = req.user;
    const user = await User.findById(id, 'username email').lean();
    res.send({ data: user });
});

router.post('/register', async (req, res) => {
    try {
        let { username, email, password } = req.body;
        if (!username || !email || !password)
            throw new Error('Invalid Values Submitted');

        username = username.trim();
        email = email.trim();
        password = password.trim();

        if (!username || !email || !password)
            throw new Error('Invalid Values Submitted');

        let users = [];
        users = await User.find({ username });
        if (users.length !== 0) throw new Error('Username already registered');

        users = await User.find({ email });
        if (users.length !== 0) throw new Error('Email already registered');

        await User.create({ username, email, password });

        res.send({ message: 'User Created' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;

        email = email.trim();
        password = password.trim();

        if (!email || !password) throw new Error('Invalid Values Submitted');

        let user = await User.findOne(
            { email, password },
            { password: 0, createdAt: 0, updatedAt: 0, __v: 0 }
        );

        if (user) {
            // In Hours
            const expiry = Math.floor(Date.now() / 1000) + 60 * 60 * 1;
            const token = sign(
                { user: user.toObject(), exp: expiry },
                JWT_SECRET
            );
            res.send({ message: 'Login Successful', data: { user, token } });
        } else {
            res.status(400).send({ error: 'Invalid Login Credentials' });
        }
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;
