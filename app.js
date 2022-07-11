const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect(
  "mongodb+srv://westernfrog:Pottyboy%407483@users.r7xott4.mongodb.net/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

var db = mongoose.connection;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/", function (req, res) {
  var name = req.body.inputName;
  var email = req.body.inputEmail;
  var message = req.body.inputMessage;

  var data = {
    inputName: name,
    inputEmail: email,
    inputMessage: message,
  };

  db.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inserted Successfully");
  });

  return res.sendFile(__dirname + "/public/index.html");
});

app.listen(3000, function () {
  console.log("Server is alive");
});
