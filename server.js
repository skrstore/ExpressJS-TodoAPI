const { default: axios } = require("axios");
const express = require("express");

const app = express();

const PORT = process.env.PORT | 8080;
const NAME = process.env.NAME;
const OTHER_SERVER = process.env.OTHER_SERVER;
const VERSION = process.env.VERSION || "v2.1";
const TYPE = process.env.TYPE || "Service";

app.use((req, res, next) => {
    console.log(`${req.hostname} : ${req.method} : ${req.path}`);
    next();
});

app.get("/", (req, res) => {
    res.status(200).json({
        message: `Server :: ${NAME}`,
        status: "success",
        version: VERSION,
        type: TYPE,
    });
});

app.get("/version", (req, res) => {
    res.json({
        message: `Server :: ${NAME}`,
        status: "success",
        data: VERSION,
        type: TYPE,
    });
});

app.get("/api/data", (req, res) => {
    res.json({
        message: `Server :: ${NAME}`,
        status: "success",
        data: "No Data Available from other Server",
        type: TYPE,
    });
});

const callOtherServer = async (url = OTHER_SERVER) => {
    try {
        if (url === undefined) {
            return "URL is undefined";
        }

        const result = await axios.get(url);

        return result.data;
    } catch (error) {
        console.log("Error: ", error);
        return "Error Occurred";
    }
};

app.get("/api/call", async (req, res) => {
    const data = await callOtherServer();

    console.log("Data from other Server :: ", data);

    res.json({
        message: `Server :: ${NAME}`,
        status: "success",
        type: TYPE,
        data,
    });
});

app.listen(PORT, () => {
    console.log(`Server ::${NAME} Running on ${PORT}`);
});
