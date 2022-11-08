const {
    Error: { CastError },
} = require("mongoose");

const Note = require("./models");
const noteSchema = require("./schema");

module.exports.getAll = async (req, res) => {
    try {
        const { _id: id } = req.user;
        if (!id) throw new Error("Login Required");

        const Notes = await Note.find({ userId: id }).select({
            __v: 0,
            userId: 0,
        });
        res.send({ data: Notes });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports.add = async (req, res) => {
    try {
        const { title, detail } = req.body;

        if (!req.user) throw new Error("Login Required");
        let { value, error } = noteSchema.validate({ title, detail });

        if (error) throw new Error("Invalid Data");

        const result = await Note.create({
            ...value,
            userId: req.user._id,
        });
        res.send({ message: "Note Added", note: result });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports.getOne = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new Error("Invalid Request");

        const note = await Note.findById(id, { __v: 0 });
        if (note) {
            res.send({ data: note });
        } else {
            res.status(404).send({
                error: "Note with this ID does not exists.",
            });
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

        const note = await Note.findByIdAndDelete(id);
        if (note) {
            res.send({ data: note, message: "Note Deleted" });
        } else {
            res.status(404).send({
                error: "Note with this ID does not exists.",
            });
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

        const { title, detail } = req.body;

        if (!req.user) throw new Error("Login Required");
        let { value, error } = noteSchema.validate({ title, detail });

        if (error) throw new Error("Invalid Data");

        const result = await Note.findByIdAndUpdate(id, { ...value });
        if (result) {
            res.send({ message: "Note Updated" });
        } else {
            res.status(404).send({
                error: "Note with this ID does not exists.",
            });
        }
    } catch (error) {
        if (error instanceof CastError) {
            res.status(400).send({ error: "Invalid ID" });
        } else {
            res.status(400).send({ error: error.message });
        }
    }
};
