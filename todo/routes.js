const express = require("express");
const router = express.Router();

const todo = require("./controllers");

router.get("/", todo.getAll);
router.get("/:id", todo.getOne);
router.delete("/:id", todo.deleteOne);
router.patch("/:id", todo.updateOne);
router.post("/", todo.add);

module.exports = router;
