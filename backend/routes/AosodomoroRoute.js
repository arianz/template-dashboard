import express from 'express';
import { getAosodomoro } from '../controllers/AosodomoroControllers.js'; 

const aosodomoro_router = express.Router();

aosodomoro_router.get('/aosodomoro', getAosodomoro);

export default aosodomoro_router;
