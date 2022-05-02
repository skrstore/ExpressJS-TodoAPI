const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const checkAuth = require("./middleware/middleware");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;
const dbURL = process.env.DB_URL || "mongodb://root:root@localhost:27017";

const connectDB = async () => {
    try {
        const con = await mongoose.connect(dbURL, {
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

connectDB();

// To do JSON Parsing and handle JSON Parsing Error
app.use((req, res, next) => {
    express.json()(req, res, (err) => {
        if (err) {
            return res
                .status(err.status)
                .send({ error: "Invalid data submitted." });
        }
        next();
    });
});

app.get("/", async (req, res) => {
    res.send({ message: "Server Running ..." });
});

app.use("/api/todo", checkAuth, require("./todo/routes"));
app.use("/api/user", require("./user/routes"));

app.use((req, res) => {
    res.status(404).send({
        message: "Invalid Path. This path does not Exists",
    });
});

app.listen(PORT, () => console.log(`Serving on ${PORT}`));
