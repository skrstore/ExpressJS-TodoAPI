const express = require("express");
const router = express.Router();

const Todo = require("./../models/todo");

// route to send all the todos
router.get("/", (req, res) => {
  Todo.find()
    .then(todos => {
      res.json({ todos: todos });
    })
    .catch(err => {
      res.status(404).json({ error: "Error Occured During Getting todos" });
      console.log("Erorr : ", err.name);
    });
});

// route to send only one todo
router.get("/:todo_id", (req, res) => {
  let todo_id = req.params.todo_id;
  Todo.findById(todo_id)
    .then(todo => {
      console.dir(todo, { depth: 0 });
      res.json({
        todo: todo
      });
    })
    .catch(err => {
      console.log("Error : ", err.name);
      res.status(404).json({ error: "Error Occured During getting the Todo" });
    });
});

// route to add a new todo
router.post("/", (req, res) => {
  let message = req.body.message;
  let todo1 = new Todo({
    message: message
  });

  todo1
    .save()
    .then(result => {
      console.log("Saved to DB ,", result);
      res.json({ message: "Data Saved to the DB" });
    })
    .catch(err => {
      console.log("Erorr in Saving , ", err.name);
      res.status(404).json({ error: "Error occured During Saving the Todo" });
    });
});

// route to update a todo
router.put("/:todo_id", (req, res) => {
  let todo_id = req.params.todo_id;
  Todo.findByIdAndUpdate(todo_id, { $set: req.body })
    .then(result => {
      console.log(result);
      res.json({ message: "Todo Updated" });
    })
    .catch(err => {
      console.log("Erorr : ", err);
      res
        .status(404)
        .json({ message: "Erorr Occured During Updating the Message" });
    });
});

// route to delete a todo
router.delete("/:todo_id", (req, res) => {
  let todo_id = req.params.todo_id;
  Todo.findByIdAndDelete(todo_id)
    .then(result => {
      res.json({ message: "Todo Deleted" });
    })
    .catch(err => {
      console.log("Erorr : ", err.name);
      res.status(404).json({ error: "Error Occured During Deleting the Todo" });
    });
});

module.exports = router;
