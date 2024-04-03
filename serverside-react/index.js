import express from "express"
import mysql from "mysql"

const app = express()

app.use(express.json())

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "testdb"
});

app.post('/register', (req, res)=>{
    db.query("INSERT INTO tbluser (username, password) VALUES (?,?)", [username,password])
})

app.listen(8800, ()=>{
    console.log("Connected To Backend")

})