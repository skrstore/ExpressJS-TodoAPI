const express = require("express");
const mongoose = require("mongoose");

const app = express();

const config = {
    name: process.env.NAME,
    port: process.env.PORT || 8000,
    version: process.env.VERSION || "v0.1", // TODO: read from package.json
};

// TODO: Look for third Party logger library to replace `console.log`

const main = async () => {
    try {
        await mongoose.connect("mongodb://admin:admin@localhost:27017/", {
            dbName: "test",
        });
        console.log("[MongoDB] Connected");

        app.use(express.json());

        // TODO: Look for Exploring some third Party tool for request logger
        app.use((req, res, next) => {
            console.log(`${req.hostname} : ${req.method} : ${req.path}`);
            next();
        });

        app.get("/", (req, res) => {
            res.json({
                message: `Server :: ${config.name}`,
                version: config.version,
            });
        });

        app.use("/todo", require("./apps/todo/todo.routes"));

        app.use(handleError);

        app.listen(config.port, () => {
            console.log(`[Server] Listening on ${config.port}`);
        });
    } catch (error) {
        console.log("Error ", error);
    }
};

const handleError = (error, req, res, next) => {
    // TODO: Explore more on - https://expressjs.com/en/guide/error-handling.html
    console.log("[handleError] ", error.message);
    return res.status(500).send({
        message: error.message,
        status: "fail",
    });
};

process.on("unhandledRejection", (error) => {
    console.log("[unhandledRejection] ", error);
    process.exit(1);
});

process.on("uncaughtException", (error) => {
    console.log("[uncaughtException] ", error);
    process.exit(1);
});

main();
