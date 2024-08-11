import express from 'express';
import { validateUpload, uploadData, fetchPmsData, deletePmsData } from '../controllers/UploadController.js';

const upload_router = express.Router();

upload_router.post('/validate-upload', validateUpload);
upload_router.post('/upload-data', uploadData);
upload_router.get('/fetch-pms-data', fetchPmsData);
upload_router.post('/delete-pms-data', deletePmsData);

export default upload_router;
