const express = require("express");
const {
  addUser,
  updateUser,
  login,
} = require("../controller/userController");
const { protect } = require("../middleWare/authMiddleware");
const route = express.Router();

route.post("/add-user", addUser);
route.post("/login", login);
route.put("/update-user", protect, updateUser);

module.exports = route;
