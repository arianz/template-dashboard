import UploadModel from '../models/UploadModel.js';

const validateUpload = async (req, res) => {
    const { table, data } = req.body;

    if (table === 'pms' || table === 'mapping_am' || table === 'aosodomoro' || table === 'collection') {
        UploadModel.query(`SHOW COLUMNS FROM ${table}`, (err, results) => {
            if (err) {
                console.error('Error fetching columns:', err);
                return res.json({ valid: false });
            }

            const tableColumns = results.map(column => column.Field);
            const isValid = data.every(column => tableColumns.includes(column));

            return res.json({ valid: isValid });
        });
    } else {
        return res.json({ valid: false });
    }
};

const fetchPmsData = (req, res) => {
    UploadModel.query('SELECT YEAR_ID, MONTH_ID, COUNT(*) as count FROM pms GROUP BY YEAR_ID, MONTH_ID', (err, results) => {
        if (err) {
            console.error('Error fetching PMS data:', err);
            return res.status(500).json({ success: false });
        }
        if (results.length === 0) {
            return res.json({ data: [], message: 'No data in PMS table' });
        }
        return res.json({ data: results });
    });
};

const deletePmsData = (req, res) => {
    const { year, month } = req.body;
    UploadModel.query('DELETE FROM pms WHERE YEAR_ID = ? AND MONTH_ID = ?', [year, month], (err) => {
        if (err) {
            console.error('Error deleting PMS data:', err);
            return res.status(500).json({ success: false });
        }
        return res.json({ success: true });
    });
};

const uploadData = async (req, res) => {
    const { table, data } = req.body;

    if (table === 'pms' || table === 'mapping_am' || table === 'aosodomoro' || table === 'collection') {
        const header = data[0];
        const rows = data.slice(1);

        const bulkData = rows.map(row => {
            const obj = {};
            row.forEach((cell, idx) => {
                obj[header[idx]] = cell;
            });
            return obj;
        });

        try {
            for (let rowData of bulkData) {
                if (table === 'pms') {
                    const { YEAR_ID, MONTH_ID } = rowData;

                    UploadModel.query(`SELECT * FROM ${table} WHERE YEAR_ID = ? AND MONTH_ID = ?`, [YEAR_ID, MONTH_ID], (err, results) => {
                        if (err) {
                            console.error('Error checking existing row:', err);
                            return res.json({ success: false });
                        }

                        if (results.length > 0) {
                            UploadModel.query(`DELETE FROM ${table} WHERE YEAR_ID = ? AND MONTH_ID = ?`, [YEAR_ID, MONTH_ID], (err) => {
                                if (err) {
                                    console.error('Error deleting existing rows:', err);
                                    return res.json({ success: false });
                                }

                                UploadModel.query(`INSERT INTO ${table} SET ?`, rowData, (err) => {
                                    if (err) {
                                        console.error('Error inserting row:', err);
                                        return res.json({ success: false });
                                    }
                                });
                            });
                        } else {
                            UploadModel.query(`INSERT INTO ${table} SET ?`, rowData, (err) => {
                                if (err) {
                                    console.error('Error inserting row:', err);
                                    return res.json({ success: false });
                                }
                            });
                        }
                    });
                } else {
                    UploadModel.query(`DELETE FROM ${table}`, (err) => {
                        if (err) {
                            console.error('Error deleting existing rows:', err);
                            return res.json({ success: false });
                        }

                        UploadModel.query(`INSERT INTO ${table} SET ?`, rowData, (err) => {
                            if (err) {
                                console.error('Error inserting row:', err);
                                return res.json({ success: false });
                            }
                        });
                    });
                }
            }
            return res.json({ success: true });
        } catch (error) {
            console.error(error);
            return res.json({ success: false });
        }
    } else {
        return res.json({ success: false });
    }
};

export { validateUpload, uploadData, fetchPmsData, deletePmsData };
