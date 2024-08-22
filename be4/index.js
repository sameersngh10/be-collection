console.log("Hello chikku");
const express = require("express");
const app = express();

app.use(express.json()); //body parse ===http request ===information ko extract krne krne keliye....body,
const port = process.env.PORT || 3000;

app.get("/get-student", (req, res) => {
  req.query;
  console.log("Get student is working");
  res.send([
    {
      id: 1,
      name: "aman",
    },
    {
      id: 2,
      name: "Rohit",
    },
  ]);
});

app.get("/get-boys", (req, res) => {
  res.send("Data send successfully");
  console.log("data:", req.query);
});

app.post("/add-num", (req, res) => {
  let num1 = Number(req.body.num1);
  let num2 = Number(req.body.num2);
  let result = num1 + num2;

  res.send("Addition :" + result);
});

app.listen(port, (req, res) => {
  console.log("App is running on port :", port);
});
