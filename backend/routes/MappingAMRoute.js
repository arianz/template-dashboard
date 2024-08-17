import express from 'express';
import { getMappingAM, getCustomerDetails, getCustomerDetailsByNIPNAS, deleteCustomer } from '../controllers/MappingAMControllers.js';
import { getPMSByNipnas, getActiveServicesByNipnas } from '../controllers/PMSControllers.js';
import { getOrderDetails } from '../controllers/AosodomoroControllers.js';
import { getCollectionByNipnas } from '../controllers/CollectionControllers.js';

const mapping_am_router = express.Router();

mapping_am_router.get('/mapping_am', getMappingAM);
mapping_am_router.get('/mapping_am/:name', getCustomerDetails);
mapping_am_router.get('/mapping_am/:name/:nipnas', getCustomerDetailsByNIPNAS);
mapping_am_router.get('/pms/:nipnas', getPMSByNipnas, getActiveServicesByNipnas);
mapping_am_router.get('/aosodomoro/:nipnas', getOrderDetails);
mapping_am_router.get('/collection/:nipnas', getCollectionByNipnas);
mapping_am_router.delete('/mapping_am/:name/:nipnas', deleteCustomer);

export default mapping_am_router;
