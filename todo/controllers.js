const Todo = require("./models");
const todoSchema = require("./schema");
const {
  Error: { CastError },
} = require("mongoose");

module.exports.getAll = async (req, res) => {
  try {
    const { _id: id } = req.user;
    if (!id) throw new Error("Login Required");

    const Todos = await Todo.find({ userId: id }).select({ __v: 0, userId: 0 });
    res.send({ data: Todos });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports.add = async (req, res) => {
  try {
    const { title, todo } = req.body;

    if (!req.user) throw new Error("Login Required");
    let { value, error } = todoSchema.validate({ title, todo });

    if (error) throw new Error("Invalid Data");

    const result = await Todo.create({
      ...value,
      userId: req.user._id,
    });
    res.send({ message: "Todo Added", todo: result });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Invalid Request");

    const todo = await Todo.findById(id, { __v: 0 });
    if (todo) {
      res.send({ data: todo });
    } else {
      res.status(404).send({ errro: "Todo with this ID does not exists." });
    }
  } catch (error) {
    if (error instanceof CastError) {
      res.status(400).send({ error: "Invalid ID" });
    } else {
      res.status(400).send({ error: error.message });
    }
  }
};

module.exports.deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Invalid Request");

    const todo = await Todo.findByIdAndDelete(id);
    if (todo) {
      res.send({ data: todo, message: "Todo Deleted" });
    } else {
      res.status(404).send({ error: "Todo with this ID does not exists." });
    }
  } catch (error) {
    if (error instanceof CastError) {
      res.status(400).send({ error: "Invalid ID" });
    } else {
      res.status(400).send({ error: error.message });
    }
  }
};

module.exports.updateOne = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Invalid Request");

    const { title, todo } = req.body;

    if (!req.user) throw new Error("Login Required");
    let { value, error } = todoSchema.validate({ title, todo });

    if (error) throw new Error("Invalid Data");

    const result = await Todo.findByIdAndUpdate(id, { ...value });
    if (result) {
      res.send({ message: "Todo Updated" });
    } else {
      res.status(404).send({ error: "Todo with this ID does not exists." });
    }
  } catch (error) {
    if (error instanceof CastError) {
      res.status(400).send({ error: "Invalid ID" });
    } else {
      res.status(400).send({ error: error.message });
    }
  }
};
