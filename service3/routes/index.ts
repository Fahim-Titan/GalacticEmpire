import express, { Router, Request, Response, NextFunction } from 'express';
import { route } from "./transactions";
const router: Router = express.Router();

router.use('/transactions', route)

export default router;