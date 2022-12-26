const mongoose = require('mongoose');
const { MONGODB_URL: DB_URL } = require('../config');

const connectDB = async () => {
    try {
        const con = await mongoose.connect(DB_URL, {
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

module.exports = { connectDB, sendSuccessResponse };
