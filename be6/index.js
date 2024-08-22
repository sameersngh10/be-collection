const express = require("express");
const mysql = require("mysql2/promise");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "movies_database",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 6000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

console.log(" COnnection Created", pool);

app.get("/get-movies", async (req, res) => {
  const [rows, fields] = await pool.query(
    `SELECT * FROM movies_database.Movie`
  );
  res.send(rows);
});

app.get("/get-moviesbyID", async (req, res) => {
  // 1st way
  //   const moviesid = req.query.movieid;
  //   const moviename = req.query.title;
  // 2nd method
  const { moviesid, moviename } = req.query;
  const [rows, fields] = await pool.query(
    `SELECT * from Movie where movie_id=${moviesid}`
  );
  res.send(rows);
});

app.post("/add-movie", async (req, res) => {
  const { movietitle, releaseyear, genres, directedby, ratings } = req.body;

  const [rows, fields] = await pool.query(
    `INSERT into Movie(title, release_year, genre, director, rating) VAlUES(?,?,?,?,?)`,
    [movietitle, releaseyear, genres, directedby, ratings]
  );
  res.send("movie added successfully");
  console.log(movietitle, releaseyear, genres, directedby, ratings);
});

app.post("/update-movie", async (req, res) => {
  const { moviesid, director } = req.body;
  const [rows, fields] = await pool.query(
    `UPDATE Movie SET director=(?) where movie_id=(?)`,
    [director, moviesid]
  );
  res.send("Director updated successfully");
});

app.listen(port, (req, res) => {
  console.log("Server is running at localhost:", port);
});
