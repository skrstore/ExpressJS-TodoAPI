const User = require("./models");
const { sign } = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || "secret";

module.exports.getUser = async (req, res) => {
    const { _id: id } = req.user;
    const user = await User.findById(id, "username email");
    res.send({ data: user });
};

module.exports.register = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        if (!username || !email || !password)
            throw new Error("Invalid Values Submitted");

        username = username.trim();
        email = email.trim();
        password = password.trim();

        if (!username || !email || !password)
            throw new Error("Invalid Values Submitted");

        let users = [];
        users = await User.find({ username });
        if (users.length !== 0) throw new Error("Username already registered");

        users = await User.find({ email });
        if (users.length !== 0) throw new Error("Email already registered");

        await User.create({ username, email, password });

        res.send({ message: "User Created" });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) throw new Error("Invalid Values Submitted");

        email = email.trim();
        password = password.trim();

        if (!email || !password) throw new Error("Invalid Values Submitted");

        let user = await User.findOne(
            { email, password },
            { password: 0, createdAt: 0, updatedAt: 0, __v: 0 }
        );

        if (user) {
            const token = sign(user.toObject(), jwtSecret);
            res.send({ message: "Login Successful", data: { user, token } });
        } else {
            res.status(400).send({ error: "Invalid Login Crendicals" });
        }
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};
