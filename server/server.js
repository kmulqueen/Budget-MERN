const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const morgan = require("morgan");
const connectDB = require("./config/connectDB");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(routes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is now running on ${PORT} in ${process.env.NODE_ENV} mode.`
  )
);
