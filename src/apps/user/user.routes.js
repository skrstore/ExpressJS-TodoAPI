const { Router } = require('express');

const { sendSuccessResponse } = require('../../shared/utils');
const { getUserById } = require('./user.controllers');

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const user = await getUserById(req.user._id);
        return res.send(sendSuccessResponse(user));
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
