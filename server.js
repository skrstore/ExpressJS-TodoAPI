const express = require("express");
const cors = require("cors");

const { checkAuth, checkJson, handleInvalidPath } = require("./middleware");
const { connectDB } = require("./utils");
const { PORT } = require("./constants");

const app = express();

connectDB();
app.use(cors());
app.use(checkJson);

app.get("/", (req, res) => {
    res.send({ message: "Server Running ..." });
});

app.use("/api/todo", checkAuth, require("./todo/routes"));
app.use("/api/user", require("./user/routes"));

app.use(handleInvalidPath);

app.listen(PORT, () => console.log(`Serving on ${PORT}`));
