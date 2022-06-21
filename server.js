const { default: axios } = require("axios");
const express = require("express");

const app = express();

const PORT = process.env.PORT | 8080;
const NAME = process.env.NAME;
const OTHER_SERVER = process.env.OTHER_SERVER;
const VERSION = process.env.VERSION || "v1.4";

app.use((req, res, next) => {
    console.log(`${req.method} : ${req.path}`);
    next();
});

app.get("/", (req, res) => {
    res.status(200).json({
        message: `Server :: ${NAME}`,
        status: "success",
        version: VERSION,
    });
});

app.get("/version", (req, res) => {
    res.json({
        message: `Server :: ${NAME}`,
        status: "success",
        data: VERSION,
    });
});

app.get("/api/data", (req, res) => {
    res.json({
        message: `Server :: ${NAME}`,
        status: "success",
        data: "No Data Available from other Server",
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
        data,
    });
});

app.listen(PORT, () => {
    console.log(`Server ::${NAME} Running on ${PORT}`);
});
