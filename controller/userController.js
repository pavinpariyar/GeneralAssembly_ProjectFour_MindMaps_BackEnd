const asyncHandler = require("express-async-handler");
const constant = require("../utils/constant");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');

const addUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error(constant.REQUIRED_FIELD_TEXT);
  }

  const isEmail = await User.findOne({ email: email });
  if (isEmail) {
    res.status(400);
    throw new Error(`Email already exist`);
  }


  const newUser = await User.create({
    name: name,
    email: email,
    password: password
  });

  res.status(200).json({ success: true, msg: "User created successfully" });
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const { name, email } = req.body;

  if (!id) {
    res.status(400);
    throw new Error(constant.REQUIRED_FIELD_TEXT);
  }

  const isUser = await User.findById(id);
  if (!isUser) {
    res.status(400);
    throw new Error(`User not found`);
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      name: name || isUser.name,
      email: email || isUser.email,
    },
    { new: true }
  );

  const userUpdated = {
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
  };

  res.status(200).json({ success: true, data: userUpdated, msg: "User updated successfully" });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error(constant.REQUIRED_FIELD_TEXT);
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid email address");
  }

  if (email && (password == user.password)) {
    const payLoad = {
      _id: user._id,
      name: user.name,
      email: user.email,
      accessToken: accessToken(user._id)
    };
    res.status(200).json({ success: true, data: payLoad });
  } else {
    res.status(400);
    throw new Error("Inavlid email or password");
  }
});

const accessToken = (payLoad) => {
  const newAccessToken = jwt.sign({ id: payLoad }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: constant.ACCESS_TOKEN_EXPIRY,
  });
  return newAccessToken;
};



module.exports = { addUser, updateUser, login };
