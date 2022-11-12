const { Router } = require("express");

const { TodoModel } = require("./todo.models");

const router = Router();
router.get("/", async (req, res) => {
    const todos = await TodoModel.find({}, { __v: 0 }).lean();
    res.send({ data: todos });
});

module.exports = router;
