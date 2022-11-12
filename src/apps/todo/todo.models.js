const { Schema, default: mongoose } = require("mongoose");

const STATUSES = {
    created: "created",
    done: "done",
    deleted: "deleted",
};

const todoSchema = new Schema(
    {
        status: {
            type: String,
            default: STATUSES.created,
            enum: Object.values(STATUSES),
        },
        title: {
            type: String,
            required: true,
        },
        detail: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
).post("save", function (doc) {
    console.log("[Todo] Saved : ", doc._id);
});

module.exports.TodoModel = mongoose.model("Todo", todoSchema);
module.exports.STATUSES = STATUSES;
