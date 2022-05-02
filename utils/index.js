const mongoose = require("mongoose");

const { DB_URL } = require("../constants");

const connectDB = async () => {
    try {
        const con = await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            // serverSelectionTimeoutMS: 2000,
            dbName: "test",
        });
        console.log(`Connected to '${con.connection.name}' DB`);
    } catch (err) {
        console.log("DB Error : ", err.message);
        process.exit();
    }
};

module.exports = { connectDB };
