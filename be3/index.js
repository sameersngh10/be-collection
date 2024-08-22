const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.get("/get-person", (req, res) => {
  res.json([
    {
      id: 1,
      name: "shashi",
    },
    {
      id: 2,
      name: "shashi",
    },
  ]);
});

app.post("/add-student", (req, res) => {
  let num1 = Number(req.body.num1);
  let num2 = Number(req.body.num2);
  let result = num1 + num2;

  res.send("Addition :" + result);
});

app.listen(port, (req, res) => {
  console.log("Listening on 3000");
});
