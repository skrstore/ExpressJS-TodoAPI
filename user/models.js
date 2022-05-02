const { Schema, model } = require("mongoose");

const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 5,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate: emailRe,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema, "myuser");
