import mysql from 'mysql2';

// Buat koneksi ke database MySQL
const UploadModel = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dashboard-am'
});

UploadModel.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

export default UploadModel;
