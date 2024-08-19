import express from 'express';
import { createLOP, getLOPData } from '../controllers/LOPController.js';

const lop_router = express.Router();

// Route to handle creating a new LOP
lop_router.post('/lop', createLOP);
lop_router.get('/lop', getLOPData);

export default lop_router;
