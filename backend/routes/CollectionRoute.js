import express from 'express';
import { getCollection } from '../controllers/CollectionControllers.js'; 

const collection_router = express.Router();

collection_router.get('/collection', getCollection);

export default collection_router;
