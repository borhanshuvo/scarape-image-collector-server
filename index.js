const express = require("express");
const mysql = require("mysql");
const app = express();
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const cors = require("cors");

const seenUrls = {};
const port = 8000;
const db = mysql.createPool({
  host: "localhost",
  database: "scrape_image",
  user: "root",
  password: "",
});

app.use(cors());
app.use(express.json());

// crawl the image from the url
const crawl = async ({ url, ignore }) => {
  if (seenUrls[url]) return;
  seenUrls[url] = true;

  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);

  const mainArray = [];

  const imageUrls = $("img")
    .map((i, link) => link.attribs.src)
    .get();

  imageUrls.filter((img, index) => {
    if (img.startsWith("http")) {
      mainArray.push(img);
    }
  });

  mainArray.map((imgUrl, index) => {
    console.log(index, typeof imgUrl);
    const sql = "INSERT INTO images_url (url) VALUES(?)";
    db.query(sql, [imgUrl], (err, results) => {
      if (err) {
        console.log(err);
      }
      console.log("Hello");
    });
  });
};

app.get("/", (req, res) => {
  res.send("Working");
});

// get all the user list
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

// users registration
app.post("/registration", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const sql = "INSERT INTO users (username, email, password) VALUES(?,?,?)";
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      res.send({ results: "Something Went Wrong" });
    }
    res.send({ results: "Registration Successfully Completed" });
  });
});

// user login
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const sql =
    "SELECT id, username, email FROM users WHERE email=? AND password=?";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

// when user post a WEB url from the frontend user can get some image url from that WEB url
app.post("/url", async (req, res) => {
  console.log(req.body.url);
  try {
    const webUrl = req.body.url;
    crawl({
      url: webUrl,
      ignore: "/search",
    });
    res.send({ result: "Image Scrape Successful" });
  } catch (err) {
    res.send({ error: "Something Went Wrong" });
  }
});

// pagination
app.post("/images", (req, res) => {
  const page = parseInt(req.body.page);
  const numPerPage = 18;
  const skip = (page - 1) * numPerPage;
  const limit = skip + "," + numPerPage;
  db.query("SELECT count(*) as numRows FROM images_url", function (err, rows) {
    if (err) {
      res.send(err);
    } else {
      var numRows = rows[0].numRows;
      db.query(
        "SELECT * FROM images_url ORDER BY id DESC LIMIT " + limit,
        function (err, rows) {
          if (err) {
            res.send(err);
          } else {
            res.send({
              images: rows,
              totalLength: numRows,
            });
          }
        }
      );
    }
  });
});

app.listen(port, () => {
  console.log("Running Server");
});
