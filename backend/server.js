import cors from 'cors'
import mysql from 'mysql2/promise'
import express from 'express'

const app = express()
app.use(cors(),express.json())

const port = 3000 

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'12345678',
    database:'korki_db1',
    port: 3306
})
// Регистрация 
app.post('/reg', (req, res) =>{
    const { fio, login, email, tel, password } = req.body
    const sql = 'INSERT INTO users (fio, login, email, tel, password) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [fio, login, email, tel, password], (err) =>{
        if (err) return res.status(500).json({msg: 'Ошибка логин занят'})
    })
})

// Авторизация






app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port} `);
});

