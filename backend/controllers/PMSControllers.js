import pms from "../models/PMSModel.js";

export const getPMS = (req, res) => {
    const query = `SELECT YEAR_ID, MONTH_ID, SUM(REVENUE) as TotalRevenue
        FROM pms
        GROUP BY YEAR_ID, MONTH_ID
        ORDER BY YEAR_ID, MONTH_ID;`;

    pms.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
};

export const getPMSByNipnas = (req, res) => {
    const { nipnas } = req.params;
    const query = `SELECT * FROM pms WHERE NIP_NAS = ?`;
  
    pms.query(query, [nipnas], (err, results) => {
      if (err) throw err;
      res.send(results);
    });
};

export const getActiveServicesByNipnas = (req, res) => {
    const { nipnas } = req.params;
    const query = `
        SELECT 
            GROUP1, GROUP2, GROUP3, GROUP4, GROUP5, REVENUE
        FROM pms 
    `;

    pms.query(query, [nipnas], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
};