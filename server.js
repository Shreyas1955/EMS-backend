const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const fs = require("fs");
require('dotenv').config();  // Load environment variables from .env file

const app = express();
app.use(express.json());
app.use(cors());

// MySQL connection setup using environment variables
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    
});

// CRUD endpoints
app.post("/savedata", (req, res) => {
    console.log(req.body);
    let data = [req.body.empid, req.body.name, req.body.number, req.body.email, req.body.salary, req.body.date];
    let sql = "insert into student values(?,?,?,?,?,?)";
    con.query(sql, data, (err, result) => {
        if (err) res.send(err);
        else res.send(result);
    });
});

app.get("/getdata", (req, res) => {
    let sql = "select * from student";
    con.query(sql, (err, result) => {
        if (err) res.send(err);
        else res.send(result);
    });
});

app.delete("/remove", (req, res) => {
    let data = [req.body.name];
    let sql = "delete from student where name=?";
    con.query(sql, data, (err, result) => {
        if (err) res.send(err);
        else res.send(result);
    });
});

app.put("/modify", (req, res) => {
    let data = [req.body.name, req.body.number, req.body.email, req.body.salary, req.body.date, req.body.empid];
    let sql = "update student set name=?,number=?,email=?,salary=?,date=? where empid=?";
    con.query(sql, data, (err, result) => {
        if (err) res.send(err);
        else res.send(result);
    });
});

app.post("/check", (req, res) => {
    console.log(req.body);
    let data = [req.body.email];
    let sql = "select * from student where email=?";
    con.query(sql, data, (err, result) => {
        if (err) res.send(err);
        else res.send(result);
    });
});

// Start the server
app.listen(9000, () => console.log("Server running on port 9000"));
