const { default: axios } = require("axios");
const express = require("express");

const app = express();

const config = {
    port: process.env.PORT || 8080,
    name: process.env.NAME || "node-server",
    otherServer: process.env.OTHER_SERVER,
    version: process.env.VERSION || "v5.0",
    type: process.env.TYPE,
};

const callOtherServer = async (url = config.otherServer) => {
    try {
        if (url === undefined) {
            return "URL is undefined";
        }

        return (await axios.get(url)).data;
    } catch (error) {
        console.log("Error: ", error);
        return "Error Occurred";
    }
};

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

app.get("/api/data", (req, res) => {
    res.json({
        message: `Server :: ${config.name}`,
        type: config.type,
        otherServer: config.otherServer,
        version: config.version,
    });
});

app.get("/api/call", async (req, res) => {
    const data = await callOtherServer();

    res.json({
        message: `Server :: ${config.name}`,
        data,
    });
});


app.use("/predict", require('./routes/predict.route'))
app.use("/precise", require('./routes/precise.route'))
app.use("/connect", require('./routes/connect.route'))

app.listen(config.port, () => {
    console.log(`Server ::${config.name} Running on ${config.port}`);
});
