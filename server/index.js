const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const { response } = require('express');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root999",
    database: "employeesystem"
})

app.get('/employees', (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/create', (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const fevfood = req.body.fevfood;
    const phonno = req.body.phonno;

    db.query("INSERT INTO employees (email, name, age, country, fevfood, phonno) VALUES(?,?,?,?,?,?)", 
    [email, name, age, country, fevfood, phonno],
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Values inserted");
        }
    }
    );
})

app.put('/update', (req, res) => {
    const id = req.body.id;
    const phonno = req.body.phonno;
    db.query("UPDATE employees SET phonno = ? WHERE id = ?", [phonno, id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.listen('3001', () => {
    console.log('Server is running on port 3001');
})