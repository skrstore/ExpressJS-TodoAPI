const express = require('express');

const { getUserById } = require('./user.controllers');

const router = express.Router();

router.get('/', async (req, res) => {
    const { _id: id } = req.user;
    const user = await getUserById(id);
    res.send({ data: user });
});

module.exports = router;
