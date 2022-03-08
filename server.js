const express = require("express");
const mongoose = require("mongoose");
const { initialize } = require("express-openapi");
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url, res.statusCode);
  next();
});

const DB_URL = "mongodb://localhost:27017/test";
const PORT = 3000;

// Database Connection
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB not Connected");
    // process.exit();
  });

const TodoController = require("./controllers/todo");
const UserController = require("./controllers/user");

app.use("/todo", TodoController);
app.use("/user", UserController);

initialize({
  app,
  apiDoc: require("./api/api-doc"),
  paths: "./api/paths",
});

// OpenAPI UI
app.use(
  "/api-documentation",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerOptions: {
      url: `http://localhost:${PORT}/api-docs`,
    },
  })
);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Serving on ${PORT}`);
});
