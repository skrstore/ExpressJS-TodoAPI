const mongoose = require('mongoose');
const { sign, verify } = require('jsonwebtoken');

const { MONGODB_URL, JWT_SECRET } = require('../config');

const connectDB = async () => {
    try {
        const con = await mongoose.connect(MONGODB_URL, {
            dbName: 'test',
        });
        console.log(`[MongoDB] Connected to '${con.connection.name}' DB`);
    } catch (err) {
        console.log('[MongoDB] Error : ', err.message);
        process.exit(0);
    }
};

// TODO: add logic to handle 'message'
const sendSuccessResponse = (data) => ({ data, status: 'success' });

/**
 *
 * @param {object} data - payload object
 * @param {number} expiry - expiry duration in hours
 */
const createToken = (data, expiry = 1) => {
    const exp = Math.floor(Date.now() / 1000) + 60 * 60 * expiry; // In Hours

    return sign({ ...data, exp }, JWT_SECRET);
};

/**
 *
 * @param {string} token - value to verify
 * @returns token payload
 */
const verifyToken = (token) => verify(token, JWT_SECRET);

module.exports = {
    connectDB,
    sendSuccessResponse,
    createToken,
    verifyToken,
};
