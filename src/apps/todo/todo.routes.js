const { Router } = require('express');

const { TodoModel } = require('./todo.models');
const todoSchema = require('./todo.validation');
const { sendSuccessResponse } = require('../../shared/utils');
const { validateReqBody } = require('../../shared/middleware');

// IMPORTANT: TODO: add user authorization in all routes

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        if (!req.user || !req.user._id) {
            res.status(401);
            throw new Error('Login Required');
        }

        const todos = await TodoModel.find({ userId: req.user._id })
            .select({ __v: 0, userId: 0 })
            .lean();
        return res.send(sendSuccessResponse(todos));
    } catch (error) {
        return next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        // NOTE: Bottom validation may be not needed
        if (!id) {
            res.status(400);
            throw new Error('Invalid Request');
        }

        const todo = await TodoModel.findById(id, { __v: 0 }).lean();
        if (!todo) {
            res.status(404);
            throw new Error('Does not exists.');
        }
        return res.send(sendSuccessResponse(todo));
    } catch (error) {
        return next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const todo = await TodoModel.findByIdAndDelete(req.params.id);
        if (!todo) {
            res.status(404);
            throw new Error('Does not exists.');
        }
        return res.send(sendSuccessResponse(todo));
    } catch (error) {
        return next(error);
    }
});

router.patch('/:id', validateReqBody(todoSchema), async (req, res, next) => {
    try {
        const { title, detail } = req.body;

        const todo = await TodoModel.findByIdAndUpdate(req.params.id, { title, detail }).lean();
        if (!todo) {
            res.status(404);
            throw new Error('Does not exists.');
        }
        return res.send({ message: 'Updated', status: 'success' });
    } catch (error) {
        return next(error);
    }
});

// TODO: Explore Do we need to have Joi Validation or Mongoose Validation is fine
router.post('/', validateReqBody(todoSchema), async (req, res, next) => {
    // TODO: Explore Wrap Route Concept - https://codefibershq.com/blog/handling-promise-rejections-in-expressjs-nodejs-with-ease
    try {
        if (!req.user || !req.user._id) {
            res.status(401);
            throw new Error('Login Required');
        }
        const { title, detail } = req.body;
        await TodoModel.create({
            title,
            detail,
            userId: req.user._id,
        });
        res.send({ message: 'Added', status: 'success' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
