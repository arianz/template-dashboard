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
            PAYMENT_CAT VARCHAR(255),
            WITEL VARCHAR(255),
            SALDO_AKHIR FLOAT,
            PERIODE DATE,
            PRIMARY KEY (ACCOUNT_NUMBER)
        )
    `;

    collection.query(createTableQuery, (err, result) => {
        if (err) throw err;
        console.log('Table "collection" created or already exists.');
    });
});

export default collection;
