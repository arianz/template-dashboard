import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import mapping_am_router from './routes/MappingAMRoute.js';
import pms_router from './routes/PMSRoute.js';
import aosodomoro_router from './routes/AosodomoroRoute.js';
import collection_router from './routes/CollectionRoute.js';
import upload_router from './routes/UploadRoute.js';
import pms from './models/PMSModel.js';
import aosodomoro from './models/AosodomoroModel.js';
import collection from './models/CollectionModel.js';
import lop_router from './routes/LOPRoute.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(mapping_am_router);
app.use(pms_router);
app.use(aosodomoro_router);
app.use(collection_router);
app.use(upload_router);
app.use(lop_router);
const port = 5000; // Port yang digunakan

// Corrected API endpoint
app.get('/detail-am/:name/:nipnas', async (req, res) => {
    const { name, nipnas } = req.params;
    const result = await db.query(
      'SELECT NIPNAS, NAMA_AM_MAPPING, NAMA_PELANGGAN FROM mapping_am WHERE NAMA_AM_MAPPING = ? AND NIPNAS = ?',
      [name, nipnas]
    );
  
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  });
  
  // PMS Endpoint
app.get('/pms-updated-at/:nipnas', async (req, res) => {
  const { nipnas } = req.params;
  const query = 'SELECT updated_at FROM pms WHERE NIP_NAS = ?';
  pms.query(query, [nipnas], (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
          return res.status(404).json({ message: 'No data found' });
      }
      res.json(results[0]);
  });
});

// Aosodomoro Endpoint
app.get('/aosodomoro-updated-at/:nipnas', async (req, res) => {
  const { nipnas } = req.params;
  const query = 'SELECT updated_at FROM aosodomoro WHERE NIPNAS = ?';
  aosodomoro.query(query, [nipnas], (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
          return res.status(404).json({ message: 'No data found' });
      }
      res.json(results[0]);
  });
});

// Collection Endpoint
app.get('/collection-updated-at/:nipnas', async (req, res) => {
  const { nipnas } = req.params;
  const query = 'SELECT updated_at FROM collection WHERE NIPNAS = ?';
  collection.query(query, [nipnas], (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
          return res.status(404).json({ message: 'No data found' });
      }
      res.json(results[0]);
  });
});


app.listen(port, () => {
    console.log(`Server up and running on port ${port}...`);
});
