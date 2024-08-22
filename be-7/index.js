const express = require("express");
const app = express();

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "movies_database",
});

console.log("connection created", pool);
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/get-actor", async (req, res) => {
  const [rows, fields] = await pool.query(`SELECT * from Actor`);
  res.send(rows);
});

app.post("/update-actor", async (req, res) => {
  const { actor_id, actor_name } = req.body;
  const [rows, fields] = await pool.query(
    `UPDATE Actor SET name=(?) where actor_id=(?)`,
    [actor_name, actor_id]
  );
  res.send("Actor Updated");
});

app.get("/get-users", async (req, res) => {
  res.send({
    name: "sameer",
    age: 20,
  });
});

app.get("/get-boys", (req, res) => {
  res.send("Data send successfully");
  console.log("data:", req.query);
});

app.post("/add-user", (req, res) => {
  console.log("body", req.body);
  res.send("Data send ");
});

app.post("/get-sum", (req, res) => {
  let num1 = Number(req.body.num1);
  let num2 = Number(req.body.num2);
  let result = num1 + num2;

  res.send("sum of num1 and num2 :" + result);
});

app.listen(port, (req, res) => {
  console.log("Server is running on :", port);
});
