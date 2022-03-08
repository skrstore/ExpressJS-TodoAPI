const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("./../models/user");

function check_auth(req, res, next) {
  try {
    let token = req.body.token;
    req.userdata = jwt.verify(token, "secret");
    next();
  } catch (err) {
    console.log("Error in Auth");
    res.status(401).json({ error: "Auth Error Occured" });
  }
}

// to create a new User
router.post("/signup", (req, res) => {
  User.find({ email: req.body.email }).then(users => {
    console.log("Users", users);
    if (users.length === 0) {
      let user1 = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      user1
        .save()
        .then(result => {
          console.log("Saved : ", result);
          res.json({ message: "User Added" });
        })
        .catch(err => {
          console.log("Erorr : ", err.name);
          res
            .status(404)
            .json({ error: "Error Occured During the User Creation" });
        });
    } else {
      res.json({ message: "Not a Valid Email" });
    }
  });
});

// to login the User
router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  User.find({ email: email, password: password })
    .then(users => {
      if (users.length != 0) {
        let user_data = {
          email: email,
          user_id: users[0]._id
        };
        console.log(user_data);
        let token = jwt.sign(user_data, "secret");
        res.json({ message: "Login Successfull", token: token });
      } else {
        res.json({ message: "Not valid Credientials" });
      }
    })
    .catch(err => {
      res.status(404).json({ error: "Erorr Occured During Login" });
    });
});

// route to send the user detail after check_auth
router.get("/:user_id", check_auth, (req, res) => {
  let user_id = req.params.user_id;
  User.findById(user_id)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(404).json({ error: "Error in Getting the User Information" });
    });
});

// route to delete the user
router.delete("/:user_id", (req, res) => {
  let user_id = req.params.user_id;
  User.findByIdAndDelete(user_id)
    .then(result => {
      console.log("User Deleted");
      res.json({ message: "User Account deleted" });
    })
    .catch(err => {
      console.log("Error : ", err.name);
      res.status(404).json({ error: "Error in deleting the User Account" });
    });
});

module.exports = router;
