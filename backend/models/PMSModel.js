import mysql from 'mysql2';

// Buat koneksi ke database MySQL
const pms = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dashboard-am'
});

pms.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
    
    // Buat tabel jika belum ada
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS pms (
            YEAR_ID INT,
            MONTH_ID INT,
            SEGMEN_BILL VARCHAR(255),
            REGIONAL_BILL VARCHAR(255),
            WITEL_BILL VARCHAR(255),
            SEGMEN_INSTALASI VARCHAR(255),
            REGIONAL_INSTALASI VARCHAR(255),
            WITEL_INSTALASI VARCHAR(255),
            SEGMEN_CUSTOMER VARCHAR(255),
            REGIONAL_CUSTOMER VARCHAR(255),
            WITEL_CUSTOMER VARCHAR(255),
            NIPNAS_GROUP VARCHAR(255),
            STANDARD_NAME_GROUP VARCHAR(255),
            NIP_NAS VARCHAR(255),
            STANDARD_NAME VARCHAR(255),
            REGIONAL_HO VARCHAR(255),
            WITEL_HO VARCHAR(255),
            INDUSTRI_HO VARCHAR(255),
            SUBSEGMEN_HO VARCHAR(255),
            SEGMEN_HO VARCHAR(255),
            NIK_BAM VARCHAR(255),
            NAMA_BAM VARCHAR(255),
            GL_ACC VARCHAR(255),
            GROUP1 VARCHAR(255),
            GROUP2 VARCHAR(255),
            GROUP3 VARCHAR(255),
            GROUP4 VARCHAR(255),
            GROUP5 VARCHAR(255),
            SOURCE_DATA VARCHAR(255),
            REVENUE DECIMAL(15, 2),
            FLAG_SCALING_SUSTAIN_REVENUE VARCHAR(255),
            FLAG_SCALING_MONTHLY_REVENUE VARCHAR(255),
            FLAG_SCALING_SUSTAIN_LAYANAN VARCHAR(255),
            FLAG_SCALING_MONTHLY_LAYANAN VARCHAR(255),
            FLAG_RECURRING VARCHAR(255),
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (NIP_NAS, YEAR_ID, MONTH_ID)  -- Menggunakan kombinasi PRIMARY KEY
        )
    `;

    pms.query(createTableQuery, (err, result) => {
        if (err) throw err;
        console.log('Table "pms" created or already exists.');
    });
});

export default pms;
