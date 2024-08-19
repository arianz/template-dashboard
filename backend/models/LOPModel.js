import mysql from 'mysql2';

// Create a connection to the database
const LOP = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dashboard-am'
});

LOP.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Create the LOP table if it doesn't exist
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS lop (
        orderType VARCHAR(255),
        namaAM VARCHAR(255),
        pelanggan VARCHAR(255),
        nipnas VARCHAR(255),
        judulProject VARCHAR(255),
        namaProduk VARCHAR(255),
        estOTC VARCHAR(255),
        estBulanan VARCHAR(255),
        estTotalQ1 VARCHAR(255),
        estTotalProject2024 VARCHAR(255),
        estTotalProject VARCHAR(255),
        bulanBillcomp VARCHAR(255),
        periodeKontrak2024 VARCHAR(255),
        nilaiBillcomp VARCHAR(255),
        statusProject VARCHAR(255),
        poin VARCHAR(255),
        statusFunnel VARCHAR(255),
        kategoriKontrak VARCHAR(255),
        kategoriLOP VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (nipnas, judulProject, namaProduk)
    )
`;

LOP.query(createTableQuery, (err, result) => {
    if (err) {
        console.error('Error creating LOP table:', err);
        return;
    }
    console.log('LOP table created or already exists');
});

export default LOP;
