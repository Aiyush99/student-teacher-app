let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
let dbConfig = require("./database/db");

// Express Route
const studentRoute = require("./routes/student.route");
const teacherRoute = require("./routes/teacher.routes");

// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("Database sucessfully connected!");
    },
    (error) => {
      console.log("Could not connect to database : " + error);
    }
  );

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/students", studentRoute);
app.use("/teachers", teacherRoute);

// PORT
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
