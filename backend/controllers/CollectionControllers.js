import collection from "../models/CollectionModel.js";

export const getCollection = (req, res) => {
    const query = ``;

    collection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
};

export const getCollectionByNipnas = (req, res) => {
    const { nipnas } = req.params;
    const query = 'SELECT * FROM collection WHERE NIPNAS = ?';

    collection.query(query, [nipnas], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
};