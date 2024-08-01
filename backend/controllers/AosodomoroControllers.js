import aosodomoro from "../models/AosodomoroModel.js";
import mapping_am from '../models/MappingAMModel.js';

export const getAosodomoro = (req, res) => {
    const query = ``;

    aosodomoro.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
};

export const getOrderDetails = (req, res) => {
    const { nipnas } = req.params;
    const query = `SELECT * FROM aosodomoro WHERE NIPNAS = ?`;

    mapping_am.query(query, [nipnas], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
};