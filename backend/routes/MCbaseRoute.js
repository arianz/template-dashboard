import express from "express";
import { getMCbase, getMcbasebyId } from "../controllers/MCbaseControllers.js"; 

const Mcbase_router = express.Router();
Mcbase_router.get('/m_cbase', getMCbase);
Mcbase_router.get('/m_cbase/:id', getMcbasebyId);

export default Mcbase_router;