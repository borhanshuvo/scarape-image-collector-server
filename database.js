// let mysql = require('mysql');

// const con = mysql.createConnection({
//   host: "localhost",
//   database: "scrape_image",
//   user: "root",
//   password: ""
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

const { createPool } = require("mysql");

const pool = createPool({
  host: "localhost",
  database: "scrape_image",
  user: "root",
  password: "",
});

const sql = "select * from users";
pool.query(sql, (err, result, fields) => {
  if (err) {
    return console.log(err);
  }
  return console.log(result);
});
