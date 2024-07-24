import collection from "../models/CollectionModel.js";

export const getCollection = (req, res) => {
    const query = ``;

    collection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
};
