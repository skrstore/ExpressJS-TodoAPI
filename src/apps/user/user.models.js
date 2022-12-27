const { Schema, model } = require('mongoose');

// eslint-disable-next-line operator-linebreak
const emailRe =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 20,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            validate: emailRe,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6,
            maxlength: 30,
        },
    },
    { timestamps: true }
);

module.exports = model('User', UserSchema);
