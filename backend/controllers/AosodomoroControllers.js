import aosodomoro from "../models/AosodomoroModel.js";

export const getAosodomoro = (req, res) => {
    const query = ``;

    aosodomoro.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
};
