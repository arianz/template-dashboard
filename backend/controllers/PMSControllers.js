import pms from "../models/PMSModel.js";

export const getPMS = (req, res) => {
    const query = ``;

    pms.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
};
