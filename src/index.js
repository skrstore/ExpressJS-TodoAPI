const express = require("express");

const app = express();

const config = {
    name: process.env.NAME,
    port: process.env.PORT || 8000,
    version: process.env.VERSION || "v0.1", // TODO: read from package.json
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

app.listen(config.port, () => {
    console.log(`[Server] Listening on ${config.port}`);
});
