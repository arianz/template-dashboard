import LOP from "../models/LOPModel.js";

// Function to create a new LOP entry
export const createLOP = (req, res) => {
    const {
        orderType,
        namaAM,
        pelanggan,
        nipnas,
        judulProject,
        namaProduk,
        estOTC,
        estBulanan,
        estTotalQ1,
        estTotalProject2024,
        estTotalProject,
        bulanBillcomp,
        periodeKontrak2024,
        nilaiBillcomp,
        statusProject,
        poin,
        statusFunnel,
        kategoriKontrak,
        kategoriLOP
    } = req.body;

    const insertQuery = `
        INSERT INTO lop (orderType, namaAM, pelanggan, nipnas, judulProject, namaProduk, estOTC, estBulanan, estTotalQ1, estTotalProject2024, estTotalProject, bulanBillcomp, periodeKontrak2024, nilaiBillcomp, statusProject, poin, statusFunnel, kategoriKontrak, kategoriLOP)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        orderType,
        namaAM,
        pelanggan,
        nipnas,
        judulProject,
        namaProduk,
        estOTC,
        estBulanan,
        estTotalQ1,
        estTotalProject2024,
        estTotalProject,
        bulanBillcomp,
        periodeKontrak2024,
        nilaiBillcomp,
        statusProject,
        poin,
        statusFunnel,
        kategoriKontrak,
        kategoriLOP
    ];

    LOP.query(insertQuery, values, (err, result) => {
        if (err) {
            console.error('Error inserting LOP:', err);
            res.status(500).send('Server error');
            return;
        }
        res.status(201).send('LOP created successfully');
    });
};

// Function to get all LOP entries
export const getLOPData = (req, res) => {
    const query = 'SELECT * FROM lop';

    LOP.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching LOP data:', err);
            res.status(500).send('Server error');
            return;
        }
        res.status(200).json(results);
    });
};

