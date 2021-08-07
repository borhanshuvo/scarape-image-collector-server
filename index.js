const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const port = 8000;
const db = mysql.createPool({
  host: "localhost",
  database: "scrape_image",
  user: "root",
  password: "",
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Working");
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

// app.get("/users/:id", (req, res) => {
//   const id = req.params.id;
//   const sql = "SELECT * FROM users WHERE id=?";
//   db.query(sql, [id], (err, result) => {
//     if (err) {
//       res.send(err);
//     }
//     res.send(result);
//   });
// });

app.post("/regstration", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const sql = "INSERT INTO users (username, email, password) VALUES(?,?,?)";
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const sql = "SELECT id, username, email FROM users WHERE email=? AND password=?";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.listen(port, () => {
  console.log("Running Server");
});
