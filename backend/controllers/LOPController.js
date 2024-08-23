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

export const updateLOP = (req, res) => {
    const { judulProject, namaProduk } = req.params;
    const {
      orderType, namaAM, pelanggan, nipnas, estOTC, estBulanan, estTotalQ1,
      estTotalProject2024, estTotalProject, bulanBillcomp, periodeKontrak2024,
      nilaiBillcomp, statusProject, poin, statusFunnel, kategoriKontrak, kategoriLOP,
    } = req.body;
  
    const query = `
      UPDATE lop SET
        orderType = ?, namaAM = ?, pelanggan = ?, nipnas = ?, estOTC = ?, estBulanan = ?,
        estTotalQ1 = ?, estTotalProject2024 = ?, estTotalProject = ?, bulanBillcomp = ?,
        periodeKontrak2024 = ?, nilaiBillcomp = ?, statusProject = ?, poin = ?,
        statusFunnel = ?, kategoriKontrak = ?, kategoriLOP = ?
      WHERE judulProject = ? AND namaProduk = ?
    `;
  
    LOP.query(query, [
      orderType, namaAM, pelanggan, nipnas, estOTC, estBulanan, estTotalQ1,
      estTotalProject2024, estTotalProject, bulanBillcomp, periodeKontrak2024,
      nilaiBillcomp, statusProject, poin, statusFunnel, kategoriKontrak, kategoriLOP, judulProject, namaProduk,
    ], (err, result) => {
      if (err) {
        console.error('Error updating LOP data:', err);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.json({ message: 'LOP data updated successfully' });
      }
    });
};

export const getLOP = (req, res) => {
    const { judulProject, namaProduk } = req.params;
  
    const query = 'SELECT * FROM lop WHERE judulProject = ? AND namaProduk = ?';
    
    LOP.query(query, [judulProject, namaProduk], (err, result) => {
      if (err) {
        console.error('Error fetching LOP data:', err);
        res.status(500).json({ message: 'Internal server error' });
      } else if (result.length === 0) {
        res.status(404).json({ message: 'LOP data not found' });
      } else {
        res.json(result[0]);
      }
    });
};

export const deleteLOP = (req, res) => {
  const { judulProject, namaProduk } = req.params;

  const query = 'DELETE FROM lop WHERE judulProject = ? AND namaProduk = ?';

  LOP.query(query, [judulProject, namaProduk], (err, result) => {
      if (err) {
          console.error('Error deleting LOP data:', err);
          res.status(500).json({ message: 'Internal server error' });
      } else if (result.affectedRows === 0) {
          res.status(404).json({ message: 'LOP data not found' });
      } else {
          res.json({ message: 'LOP data deleted successfully' });
      }
  });
};