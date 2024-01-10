const express = require("express");
const router = express.Router();
const userService = require("./user.service");
const authorize = require("../utils/authorise");
const Role = require("../utils/roles");

function login(req, res, next) {
  userService
    .authenticate(req.body)
    .then((user) =>
      user
        ? res.json(user)
        : res
            .status(400)
            .json({ message: "email/phone or password is incorrect" })
    )
    .catch((err) => next(err));
}

function signup(req, res, next) {
  userService
    .create(req.body)
    .then(() => res.json("success"))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  userService
    .getAll()
    .then((users) => {
      // console.log(users);
      res.json(users);
    })
    .catch((err) => next(err));
}

function getById(req, res, next) {
  const currentUser = req.user;

  // only allow admins to access other user records
  if (req.params.id !== currentUser.sub && currentUser.role !== Role.Admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  userService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function updateById(req, res, next) {
  const currentUser = req.user;

  // only allow admins to update other user records
  if (req.params.id !== currentUser.sub && currentUser.role !== Role.Admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  userService
    .updateById(req.params.id, req.body)
    .then(() => res.json("success"))
    .catch((err) => next(err));
}

function deleteById(req, res, next) {
  const currentUser = req.user;

  // only allow admins to delete other user records
  if (req.params.id !== currentUser.sub && currentUser.role !== Role.Admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  userService
    .deleteById(req.params.id)
    .then(() => res.json("deleted"))
    .catch((err) => next(err));
}

// public routes
router.post("/login", login);
router.post("/signup", signup);

//admin only
router.get("/", authorize(Role.Admin), getAll);

//all authenticate users
router.get("/:id", authorize(), getById);
router.put("/:id", authorize(), updateById);
router.delete("/:id", authorize(), deleteById);

module.exports = router;
