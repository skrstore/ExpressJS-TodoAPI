const express = require('express');
const { sign } = require('jsonwebtoken');

const { JWT_SECRET } = require('../../config');
const { addUser, getUserByEmailPassword } = require('../user/user.controllers');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        await addUser(username, email, password);

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

        const user = await getUserByEmailPassword(email, password);

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
