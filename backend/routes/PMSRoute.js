import express from 'express';
import { getPMS } from '../controllers/PMSControllers.js';

const pms_router = express.Router();

pms_router.get('/pms', getPMS);

export default pms_router;
