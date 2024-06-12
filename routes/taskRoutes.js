const express = require("express");
const {
  addTask, updateTask, getTasks, deleteTask
} = require("../controller/taskController");
const { protect } = require("../middleWare/authMiddleware");
const route = express.Router();


route.post("/add-task", protect, addTask);
route.put("/update-task", protect, updateTask);
route.get("/get-my-tasks", protect, getTasks);
route.delete("/delete-task", protect, deleteTask);

module.exports = route;
