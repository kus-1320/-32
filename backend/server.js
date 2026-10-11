import cors from 'cors'
import db from './db.js'
import express from 'express'

const app = express()
app.use(cors(), express.json())

const port = 1234

// Регистрация 
app.post('/reg', (req, res) => {
    const { login, password, fio, tel, email } = req.body
    const sql = `INSERT INTO users(login, password, fio, tel, email) VALUES(?,?,?,?,?)`
    
    db.query(sql, [login, password, fio, tel, email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Ошибка при регистрации" });
        }
        res.json({ msg: "Пользователь создан", id: result.insertId });
    })
})

//  Авторизация 
app.post('/login', (req, res) => {
    const { login, password } = req.body

    // Вход администратора по логину и паролю из задания
    if (login === 'Conf2027' && password === 'Demo77') {
        return res.json({
            message: "Успешна",
            id: 0,
            role: "admin"
        })
    }

    const sql = `SELECT * FROM users WHERE login = ? AND password = ?`
    
    db.query(sql, [login, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Ошибка сервера" });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: "Неверный логин или пароль" });
        }

        res.json({
            message: "Успешна",
            id: result[0].id_users,
            role: "user"
        })
    })
})

//  Создание заявки 
app.post('/appl', (req, res) => {
    const { user_id, platform, date, payment } = req.body
    const sql = `INSERT INTO zayavki (user_id, platform, date, payment, status) VALUES (?,?,?,?, 'Новая')`
    
    db.query(sql, [user_id, platform, date, payment], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Ошибка при создании заявки" });
        }
        res.json({ message: "Заявка создана", id: result.insertId });
    })
})

//  Получение всех заявок 
app.get('/applications', (req, res) => {
    const sql = `SELECT * FROM zayavki`
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Ошибка загрузки заявок" });
        }
        res.json(result)
    })
})

//  Обновление статуса АДМИН
app.put('/applications/:id', (req, res) => {
    const { id } = req.params
    const { status } = req.body

    
    const sql = `UPDATE zayavki SET status = ? WHERE idapplications = ?` 

    db.query(sql, [status, id], (err, result) => {
        if (err) {
            console.error(" Ошибка обновления статуса:", err);
            return res.status(500).json({ error: "Ошибка базы данных" });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Заявка не найдена" });
        }
        
        console.log(` Статус заявки ${id} успешно изменен на "${status}"`);
        res.json({ message: "Статус успешно изменен" })
    })
})

// Сохранение отзыва
app.put('/applications/:id/review', (req, res) => {
    const { id } = req.params
    const { rewiest } = req.body 


    const sql = `UPDATE zayavki SET rewiest = ? WHERE idapplications = ?`

    db.query(sql, [rewiest, id], (err, result) => {
        if (err) {
            console.error(" Ошибка сохранения отзыва:", err);
            return res.status(500).json({ error: "Ошибка базы данных" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Заявка не найдена" });
        }

        console.log(`Отзыв для заявки ${id} успешно сохранен`);
        res.json({ message: "Отзыв успешно сохранен" })
    })
})

// Удаление заявки (админ)
app.delete('/applications/:id', (req, res) => {
    const { id } = req.params
    const sql = `DELETE FROM zayavki WHERE idapplications = ?`

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(" Ошибка удаления заявки:", err);
            return res.status(500).json({ error: "Ошибка базы данных" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Заявка не найдена" });
        }

        res.json({ message: "Заявка удалена" })
    })
})

app.listen(port, () => {
    console.log(` Сервер запущен на порту ${port}`)
})