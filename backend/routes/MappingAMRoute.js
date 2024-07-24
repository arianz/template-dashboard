import express from 'express';
import { getMappingAM, getCustomerDetails, getCustomerDetailsByNIPNAS } from '../controllers/MappingAMControllers.js';

const mapping_am_router = express.Router();

mapping_am_router.get('/mapping_am', getMappingAM);
mapping_am_router.get('/mapping_am/:name', getCustomerDetails);
mapping_am_router.get('/mapping_am/:name/:nipnas', getCustomerDetailsByNIPNAS);

export default mapping_am_router;
