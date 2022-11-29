const User = require('./user.models');

const getUserById = async (userId) => {
    const user = await User.findById(userId, 'username email').lean();
    return user;
};

const getUserByEmailPassword = async (email, password) => {
    const user = await User.findOne(
        { email, password },
        {
            password: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
        }
    );

    return user;
};

const addUser = async (username, email, password) => {
    let existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new Error('Username already registered');
    }

    existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('Email already registered');
    }

    const newUser = await User.create({ username, email, password });
    return { message: 'User Created', data: { user: newUser } };
};

module.exports = { getUserById, addUser, getUserByEmailPassword };
