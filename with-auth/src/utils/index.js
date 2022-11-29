const mongoose = require('mongoose');

const { DB_URL } = require('../config');

const connectDB = async () => {
    try {
        const con = await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            // serverSelectionTimeoutMS: 2000,
            dbName: 'test',
        });
        console.log(`[MongoDB] Connected to '${con.connection.name}' DB`);
    } catch (err) {
        console.log('[MongoDB] Error : ', err.message);
        process.exit();
    }
};

module.exports = { connectDB };
