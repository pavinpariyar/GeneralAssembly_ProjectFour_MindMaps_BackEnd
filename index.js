const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const errorHandler = require("./middleWare/errorHandler");
const Constant = require("./utils/constant");
const cors = require("cors");


const port = Constant.PORT;

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("*", (req, res) => {
  res.status(400);
  throw new Error("Endpoint not found");
});

app.use(errorHandler);

app.listen(port, () => console.log(`Server is listening on port: ${port}`));
