const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

const _ = require("lodash");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("public/images"));
var mysql = require("mysql");
const connection = mysql.createConnection({
  host: "remotemysql.com",
  user: "xRrfTdEb8w",
  password: "E9Dj4rlvkJ",
  database: "xRrfTdEb8w",
});
app.get("/", function (req, res) {
  res.render("login");
});
app.get("/user", function (req, res) {
  res.render("user");
});
app.get("/company", function (req, res) {
  res.render("company");
});
app.get("/admin", function (req, res) {
  res.render("admin");
});
app.post("/", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    connection.query(
      "SELECT username, password,user_type FROM user WHERE username = ? AND password = ?",
      [username, password],
      function (err, results) {
        if (results[0].user_type == "user") {
          res.redirect("/user");
        } else throw err;
      }
    );
  });
});
app.listen(3000, function () {
  console.log("server started!");
});
