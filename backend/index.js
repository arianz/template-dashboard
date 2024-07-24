import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import mapping_am_router from './routes/MappingAMRoute.js';
import pms_router from './routes/PMSRoute.js';
import aosodomoro_router from './routes/AosodomoroRoute.js';
import collection_router from './routes/CollectionRoute.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(mapping_am_router);
app.use(pms_router);
app.use(aosodomoro_router);
app.use(collection_router);
const port = 5000; // Port yang digunakan

app.listen(port, () => {
    console.log(`Server up and running on port ${port}...`);
});
