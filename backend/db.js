import mysql from 'mysql2'

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'konfirens',
    port: 3306
})
db.connect((err) => {
    if (err) {
        console.error(err);
        return
    }

    console.log("Подключена");

})

export default db 