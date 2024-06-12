const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");
const constant = require("../utils/constant");

const addTask = asyncHandler(async (req, res) => {
  const { text } = req.body;

  await Task.create({
    text: text,
    createdBy: req.user._id.toString()
  });

  res.status(200).json({ success: true, msg: "Task created successfully" });
});

const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const { text } = req.body;

  const isTask = await Task.findOne({ _id: id, createdBy: req.user._id.toString() })
  if (!isTask) {
    res.status(400);
    throw new Error("Task not found");
  }


  await Task.findByIdAndUpdate(id, {
    text: text
  });

  res.status(200).json({ success: true, msg: "Task updated successfully" });
});

const getTasks = asyncHandler(async (req, res) => {
  const id = req.user._id.toString();

  const allTasks = await Task.find({
    createdBy: id
  });

  res.status(200).json({ success: true, data: allTasks });
});

const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.query;

  if (!id) {
    res.status(400);
    throw new Error(constant.REQUIRED_FIELD_TEXT);
  }

  await Task.findByIdAndDelete(id);
  res.status(200).json({ success: true, msg: "Task deleted successfully!" });

});




module.exports = { addTask, updateTask, getTasks, deleteTask };
