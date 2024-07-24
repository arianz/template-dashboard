import mapping_am from '../models/MappingAMModel.js';

export const getMappingAM = (req, res) => {
    const query = `SELECT NAMA_AM_MAPPING AS NAMA_AM, COUNT(*) AS JML_PELANGGAN 
                   FROM mapping_am 
                   GROUP BY NAMA_AM_MAPPING`;

    mapping_am.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
};

// Endpoint untuk mendapatkan detail pelanggan berdasarkan nama account manager
export const getCustomerDetails = (req, res) => {
    const { name } = req.params;
    const query = `SELECT NIPNAS AS NIPNAS, NAMA_PELANGGAN AS NAMA_PELANGGAN
                   FROM mapping_am 
                   WHERE NAMA_AM_MAPPING = ?`;

    mapping_am.query(query, [name], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
};

export const getCustomerDetailsByNIPNAS = (req, res) => {
    const { name, nipnas } = req.params;
    const query = 'SELECT * FROM mapping_am WHERE NAMA_AM_MAPPING = ? AND NIPNAS = ?';
    
    mapping_am.query(query, [name, nipnas], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(results[0]);
      }
    });
  };
  