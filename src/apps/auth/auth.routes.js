const { Router } = require('express');

const { validateReqBody } = require('../../shared/middleware');
const { createToken } = require('../../shared/utils');
const { addUser, getUserByEmailPassword } = require('../user/user.controllers');
const { registerVSchema, loginVSchema } = require('../user/user.validation');

const router = Router();

router.post('/register', validateReqBody(registerVSchema), async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        await addUser(username, email, password);

        return res.send({ message: 'User Created' });
    } catch (error) {
        return next(error);
    }
});

router.post('/login', validateReqBody(loginVSchema), async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await getUserByEmailPassword(email, password);

        if (!user) {
            res.status(400);
            throw new Error('Invalid Credentials');
        }
        const token = createToken({ user: user.toObject() });
        return res.send({ message: 'Login Successful', data: { user, token } });
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
