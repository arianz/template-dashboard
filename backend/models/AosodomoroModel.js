import mysql from 'mysql2';

// Buat koneksi ke database MySQL
const aosodomoro = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dashboard-am'
});

aosodomoro.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
    
    // Buat tabel jika belum ada
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS aosodomoro (
            ORDER_ID VARCHAR(255),
            ORDER_SUBTYPE VARCHAR(255),
            WITEL_BILL VARCHAR(255),
            LI_PRODUCT_NAME VARCHAR(255),
            KATEGORI_PRODUCT VARCHAR(255),
            WITEL VARCHAR(255),
            ORDER_CREATED_DATE DATE,
            MILESTONE VARCHAR(255),
            ORDER_STATUS VARCHAR(255),
            NIPNAS VARCHAR(255),
            PRIODE VARCHAR(255),
            PRIMARY KEY (NIPNAS)
        )
    `;

    aosodomoro.query(createTableQuery, (err, result) => {
        if (err) throw err;
        console.log('Table "aosodomoro" created or already exists.');
    });
});

export default aosodomoro;
