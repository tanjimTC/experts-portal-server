const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
require("./utils/apiResponse");
require("dotenv").config();

const uri = process.env.DB_PATH;

// mongoDB connect
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// mongoose.connect("mongodb://127.0.0.1/experts-portal", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// check connecttions
mongoose.connection.on("connected", () => {
  console.log("connected");
});

const app = express();
app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Routes
const auth = require("./routes/auth");
const billing = require("./routes/billing");
const appointment = require("./routes/appointment");

// Middleware

// Routes
app.use("/auth", auth);
app.use("/billing", billing);
app.use("/appointment", appointment);

// Catch 404 Errors and send them to Error handler
app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

// Error handler function
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  // Response to client
  res.status(status).json({
    error: {
      message: error.message,
    },
  });
  // Response to ourself
  console.error(err);
});

// Start the server
const port = app.get("port") || 4000;
app.listen(process.env.PORT || port, () =>
  console.log(`Listening to port ${port}`)
);
