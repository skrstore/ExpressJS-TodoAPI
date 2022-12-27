const { Schema, Types, default: mongoose } = require('mongoose');

const STATUSES = {
    created: 'created',
    done: 'done',
    deleted: 'deleted',
};

const TodoSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        detail: {
            type: String,
            required: false,
        },
        userId: {
            type: Types.ObjectId,
            required: true,
        },
        status: {
            type: String,
            default: STATUSES.created,
            enum: Object.values(STATUSES),
        },
    },
    { timestamps: true }
    // eslint-disable-next-line prefer-arrow-callback, func-names
).post('save', function (doc) {
    console.log('[Todo] Saved : ', doc._id);
});

module.exports.TodoModel = mongoose.model('Todo', TodoSchema);
module.exports.STATUSES = STATUSES;
