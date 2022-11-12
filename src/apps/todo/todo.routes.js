const { Router } = require("express");

const { TodoModel } = require("./todo.models");

const router = Router();

// TODO: Look for Swagger or Postman Docs Usage for API Documentation

router.get("/", async (req, res) => {
    const todos = await TodoModel.find({}, { __v: 0 }).lean();
    res.send({ data: todos, status: "success" });
});

router.post("/", async (req, res, next) => {
    // TODO: Explore Wrap Route Concept - https://codefibershq.com/blog/handling-promise-rejections-in-expressjs-nodejs-with-ease
    try {
        // TODO: Explore Do we need to have Joi Validation or Mongoose Validation is fine
        const todo = new TodoModel({
            title: req.body.title,
            detail: req.body.detail,
        });

        await todo.save();

        res.send({ status: "success", message: "todo Saved" });
    } catch (error) {
        next(error);
    }
});

router.get("/:todoId", async (req, res, next) => {
    try {
        const todo = await TodoModel.findById(req.params.todoId, {
            __v: 0,
        }).lean();

        res.send({ status: "success", data: todo });
    } catch (error) {
        next(error);
    }
});

router.patch("/:todoId", async (req, res, next) => {
    try {
        // TODO: Explore more which one to use `findByIdAndUpdate` or `findOne` or else
        await TodoModel.findByIdAndUpdate(req.params.todoId, {
            title: req.body.title,
            detail: req.body.detail,
            status: req.body.status,
        });

        res.send({ status: "success", message: "todo Updated" });
    } catch (error) {
        next(error);
    }
});

router.delete("/:todoId", async (req, res, next) => {
    try {
        await TodoModel.findByIdAndDelete(req.params.todoId);

        res.send({ status: "success", message: "todo Deleted" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
