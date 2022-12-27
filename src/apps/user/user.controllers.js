const UserModel = require('./user.models');

// TODO: combine getUserById, getUserByEmailPassword to getUser and
// - pass dynamic parameter(query, return values)
const getUserById = async (userId) => {
    const user = await UserModel.findById(userId, 'username email').lean();
    return user;
};

const getUserByEmailPassword = async (email, password) => {
    // TODO: check what is the benefits of using .lean()
    const user = await UserModel.findOne(
        { email, password },
        {
            password: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
        }
    ).lean();

    return user;
};

const addUser = async (username, email, password) => {
    // TODO: Check Is using User.exists is better than User.findOne
    // TODO: check if username, email check can be combined
    // TODO: check if using mongoose unique validation is enough for this
    let userExists = await UserModel.exists({ username }).lean();
    if (userExists) {
        throw new Error('username unavailable');
    }

    userExists = await UserModel.exists({ email }).lean();
    if (userExists) {
        throw new Error('email unavailable');
    }

    await UserModel.create({ username, email, password });
};

module.exports = { getUserById, addUser, getUserByEmailPassword };
