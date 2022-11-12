const express = require("express");
const mongoose = require("mongoose");

const app = express();

const config = {
    name: process.env.NAME,
    port: process.env.PORT || 8000,
    version: process.env.VERSION || "v0.1", // TODO: read from package.json
};
const main = async () => {
    try {
        await mongoose.connect("mongodb://admin:admin@localhost:27017/", {
            dbName: "test",
        });
        console.log("[MongoDB] Connected");
        // const todo1 = new TodoModel({
        //     title: "Todo 3",
        // });
        // let result = await todo1.save();

        //  result = await TodoModel.find().lean();
        //  result = await TodoModel.deleteMany();

        // console.log("RESULT ", result);

        app.use((req, res, next) => {
            console.log(`${req.hostname} : ${req.method} : ${req.path}`);
            next();
        });

        app.get("/", (req, res) => {
            res.json({
                message: `Server :: ${config.name}`,
                version: config.version,
                type: config.type,
            });
        });

        app.use('/todo', require('./apps/todo/todo.routes'));

        app.listen(config.port, () => {
            console.log(`[Server] Listening on ${config.port}`);
        });
    } catch (error) {
        console.log("Error ", error);
    }
};

main();
