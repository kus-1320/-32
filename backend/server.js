import cors from 'cors'
import mysql from 'mysql2/promise'
import express from 'express'

const app = express()
app.use(cors(), express.json())

const port = 4000

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'korki_db1',
  port: 3306
})
// Регистрация 

app.post('/reg', async (req, res) => {
  try {
    const { login, password, fio, tel, email } = req.body;

    const [user] = await db.query('INSERT INTO users (login, password, fio, tel, email) VALUES (?,?,?,?,?)', [login, password, fio, tel, email])
    console.log(user);
    return res.status(200).json({ msg: "все круто" })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'ОШИБКА ЛОГИН ЗАНЯТ' })
  }
})
// Авторизация 

app.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;

     if (login === 'Admin' && password === 'KorokNET') {
    return res.json({ role: 'admin', id: 0 });
  }

    const [user] = await db.query ('SELECT * FROM users WHERE login = ? AND password = ?', [login, password])
    console.log(user);
    return res.status(200).json({ msg: "все круто" })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'ОШИБКА неверный логин или пароль' })
  }
})

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port} `);
});

