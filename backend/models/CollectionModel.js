import mysql from 'mysql2';

// Buat koneksi ke database MySQL
const collection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dashboard-am'
});

collection.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
    
    // Buat tabel jika belum ada
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS collection (
            ACCOUNT_NUMBER VARCHAR(255),
            NIPNAS VARCHAR(255),
            PAYMENT_CAT VARCHAR(255),
            WITEL VARCHAR(255),
            SALDO_AKHIR FLOAT,
            PERIODE DATE,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (ACCOUNT_NUMBER),
            UNIQUE (ACCOUNT_NUMBER, NIPNAS)
        )
    `;

    collection.query(createTableQuery, (err, result) => {
        if (err) throw err;
        console.log('Table "collection" created or already exists.');
    });
});

export default collection;
