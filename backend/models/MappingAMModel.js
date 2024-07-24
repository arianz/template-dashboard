import mysql from 'mysql2';

// Buat koneksi ke database MySQL
const mapping_am = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dashboard-am'
});

mapping_am.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
    
    // Buat tabel jika belum ada
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS mapping_am (
            NIPNAS VARCHAR(50) NOT NULL,
            NIK_AM_MAPPING VARCHAR(50) NOT NULL,
            NAMA_AM_MAPPING VARCHAR(100) NOT NULL,
            WITEL_AM VARCHAR(100) NOT NULL,
            TANGGAL_UPDATE DATE NOT NULL,
            NIK_AM_HERO_KAKANDATEL VARCHAR(50),
            NAMA_AM_HERO_KAKANDATEL VARCHAR(100),
            MAPPING_NON_MAPPING VARCHAR(50),
            NAMA_PELANGGAN VARCHAR(100),
            PRIMARY KEY (NIPNAS, NIK_AM_MAPPING, NAMA_AM_MAPPING)
        )
    `;

    mapping_am.query(createTableQuery, (err, result) => {
        if (err) throw err;
        console.log('Table "mapping_am" created or already exists.');
    });
});

export default mapping_am;
