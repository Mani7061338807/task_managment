const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();
const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();
const port = process.env.PORT || 3001;
//db connect
const dbConnection = async () => {
  const db_uri = process.env.MONGO_URI;
  try {
    await mongoose.connect(db_uri);
    console.log("db connected!");
  } catch (error) {
    console.log(error);
  }
};

dbConnection();

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/", authRoutes);
app.use("/", taskRoutes);

app.listen(port, () => {
  console.log("server started..");
});
