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

//crawler function
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

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

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

app.post("/url", async (req, res) => {
  const webUrl = req.body.url;
  try {
    crawl({
      url: webUrl,
      ignore: "/search",
    });
    res.send({ result: "Image scrape successful" });
  } catch (err) {
    res.send(err);
  }
});

app.get("/imageURL", (req, res) => {
  const sql = "SELECT * FROM images_url ORDER BY id DESC";
  db.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.listen(port, () => {
  console.log("Running Server");
});
