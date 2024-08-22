const express = require("express");
const { createConnection, createPool } = require("mysql2");
const mysql2 = require("mysql2/promise");
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database:
});

app.listen(port, (req, res) => {
  console.log("App is running on localhost :", port);
});
