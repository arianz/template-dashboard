import express from 'express';
import { createLOP, getLOPData, updateLOP, getLOP, deleteLOP } from '../controllers/LOPController.js';

const lop_router = express.Router();

// Route to handle creating a new LOP
lop_router.post('/lop', createLOP);
lop_router.get('/lop', getLOPData);
lop_router.put('/lop/:judulProject/:namaProduk', updateLOP);
lop_router.get('/lop/:judulProject/:namaProduk', getLOP);
lop_router.delete('/lop/:judulProject/:namaProduk', deleteLOP);

export default lop_router;
