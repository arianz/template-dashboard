import mysql from 'mysql2';

// Buat koneksi ke database MySQL
const LoginModel = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dashboard-am'
});

LoginModel.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
    
    // Buat tabel users jika belum ada
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            role ENUM('Manajemen', 'AM', 'Unit PRQ') NOT NULL
        )
    `;

    LoginModel.query(createTableQuery, (err, result) => {
        if (err) throw err;
        console.log('Table "users" created or already exists.');
    });
});

export default LoginModel;
