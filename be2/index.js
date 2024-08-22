const express = require("express");
const mysql = require("mysql2/promise");
const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "movies_database",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

console.log("Connection created", pool);

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Running on 3000");
});

app.get("/get-actor", async (req, res) => {
  const [rows, fields] = await pool.query("SELECT * from Actor");
  res.send(rows);
});
app.get("/get-actorbyid", async (req, res) => {
  //first way
  // const actorid = req.query.actorid;
  // const nationality = req.query.nationality

  // second way
  const { actorid, nationality } = req.query;

  console.log(actorid, nationality);

  //console.log('query', req.query)
  const [rows, fields] = await pool.query(
    `SELECT * from Actor where actor_id=${actorid}`
  );
  res.send(rows);
});

app.get("/get-nation", async (req, res) => {
  const { actor, national } = req.query;
  console.log(actor, national);

  // SELECT * from Actor where nationality=?
  const [rows, fields] = await pool.query(
    `SELECT * from Actor where nationality=${actor}`
  );
  res.send(rows);
});

app.get("/get-insert", async (req, res) => {
  const [rows, fields] = await pool.query(
    "INSERT INTO Actor( name, date_of_birth, nationality) VALUES('Rajesh khanna','1943-10-03','Indian' )"
  );
  console.log("1 record added successfully");
});

app.post("/add-actor", (req, res) => {
  console.log("body", req.body);
  res.send("hello");
});

app.post("/add-acctor1", async (req, res) => {
  const { actor_name, dateofbirth, nation } = req.body;
  console.log(actor_name, dateofbirth, nation);
  const [rows, fields] = await pool.query(
    `INSERT into Actor(name, date_of_birth, nationality) VALUES(?, ?, ?)`,
    [actor_name, dateofbirth, nation]
  );
  console.log("actor added to the table");
  res.send("Actor Added successfully");
});
app.post("/update-actor", async (req, res) => {
  const { actor_id, nationality } = req.body;
  console.log(actor_id, nationality);
  const [rows, fields] = await pool.query(
    `UPDATE Actor SET nationality=(?) where actor_id=(?)`,
    [nationality, actor_id]
  );
  res.send("Nationality update successfully");
});
app.post("/delete-actor", async (req, res) => {
  const { actor_id } = req.body;
  console.log(actor_id);
  const [rows, fields] = await pool.query(
    `DELETE from  movies_database.Actor where actor_id=(?)`,
    [actor_id]
  );
  res.send("Record delete successfully");
});

app.listen(port, () => {
  console.log("running on localhost 3000");
});
