const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./config/connectDB");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(routes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/client/build")));

  // Any route that is not an api route points to the index.html file in the static build folder
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is now running on ${PORT} in ${process.env.NODE_ENV} mode.`
  )
);
