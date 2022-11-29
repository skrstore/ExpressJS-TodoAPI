const {
    Error: { CastError },
} = require('mongoose');

const { TodoModel } = require('./todo.models');
const todoSchema = require('./schema');

module.exports.getAll = async (req, res) => {
    try {
        const { _id: id } = req.user;
        if (!id) throw new Error('Login Required');

        const Todos = await TodoModel.find({ userId: id })
            .select({
                __v: 0,
                userId: 0,
            })
            .lean();
        res.send({ data: Todos, status: 'success' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports.add = async (req, res, next) => {
    // TODO: Explore Wrap Route Concept - https://codefibershq.com/blog/handling-promise-rejections-in-expressjs-nodejs-with-ease
    try {
        const { title, detail } = req.body;

        if (!req.user) throw new Error('Login Required');
        // TODO: Explore Do we need to have Joi Validation or Mongoose Validation is fine
        const { value, error } = todoSchema.validate({ title, detail });

        if (error) throw new Error('Invalid Data');

        await TodoModel.create({
            ...value,
            userId: req.user._id,
        });
        res.send({ message: 'Todo Added', status: 'success' });
    } catch (error) {
        // res.status(400).send({ error: error.message });
        next(error);
    }
};

module.exports.getOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) throw new Error('Invalid Request');

        const todo = await TodoModel.findById(id, { __v: 0 }).lean();
        if (todo) {
            res.send({ data: todo, status: 'success' });
        } else {
            res.status(404).send({
                error: 'Note with this ID does not exists.',
            });
        }
    } catch (error) {
        if (error instanceof CastError) {
            res.status(400).send({ error: 'Invalid ID' });
        } else {
            next(error);
            // res.status(400).send({ error: error.message });
        }
    }
};

module.exports.deleteOne = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new Error('Invalid Request');

        const note = await TodoModel.findByIdAndDelete(id);
        if (note) {
            res.send({ data: note, message: 'Note Deleted' });
        } else {
            res.status(404).send({
                error: 'Note with this ID does not exists.',
            });
        }
    } catch (error) {
        if (error instanceof CastError) {
            res.status(400).send({ error: 'Invalid ID' });
        } else {
            res.status(400).send({ error: error.message });
        }
    }
};

module.exports.updateOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) throw new Error('Invalid Request');

        const { title, detail } = req.body;

        if (!req.user) throw new Error('Login Required');
        const { value, error } = todoSchema.validate({ title, detail });

        if (error) throw new Error('Invalid Data');

        const result = await TodoModel.findByIdAndUpdate(id, { ...value });
        if (result) {
            res.send({ message: 'Note Updated' });
        } else {
            res.status(404).send({
                error: 'Note with this ID does not exists.',
            });
        }
    } catch (error) {
        if (error instanceof CastError) {
            res.status(400).send({ error: 'Invalid ID' });
        } else {
            // res.status(400).send({ error: error.message });
            next(error);
        }
    }
};
