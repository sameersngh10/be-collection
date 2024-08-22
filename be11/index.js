const express = require('express');
const app = express();

const mysql = require('mysql2/promise')
app.use(express.json());
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "userdatabase",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
 
})
const port = 4000;

 console.log("pool created:", pool);
app.get('/user', async (req , res) => {
   const [rows, fields]=  await pool.query(`SELECT * FROM userdetails`);
   res.send(rows);
});

app.post("/insertusers", async (req, res)=>{
    const {user_name, password , user_email, user_mobile}= req.body;

    const result = await pool.query(`INSERT INTO userdetails(user_name, password , user_email, user_mobile) VALUES(?,?,?,?)`,[user_name, password , user_email, user_mobile]);
    res.send("user added successfully");
})

app.post('/add-sum',async (req, res)=>{
    const num1= Number(req.body.num1);
    const num2 = Number(req.body.num2);

    const result = num1+num2;

    res.send("Additon of Num1 and Num2: "+ result);
})


app.listen(port, ()=>{
    console.log("App is listening at :", port);
})