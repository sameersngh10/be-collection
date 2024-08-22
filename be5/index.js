const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

//http method GET, POST , PATCH, PUT DELETE

app.get("/get-actor", (req, res) => {
  console.log("Get Actor is working");
  res.send([
    {
      id: 1,
      name: "RDJ",
    },
    {
      id: 2,
      namae: "Tom Holland",
    },
  ]);
});

app.get("/get-actoress", (req, res) => {
  req.query;
  console.log("data send successfully");
  console.log("data:", req.query);
});

app.post("/multiply-nums", (req, res) => {
  let num1 = Number(req.body.num1);
  let num2 = Number(req.body.num2);
  let res1 = num1 * num2;

  res.send("multiplication:" + res1);
});

app.listen(port, (req, res) => {
  console.log("App is running on port :", port);
});
