import express from 'express'
import bodyParser from 'body-parser'
import serviceRouter from './Service/route.js'
import categoriesRouter from './Category/route.js';
import authRouter from './Auth/route.js';
const router = express.Router();

router.use(bodyParser.json());
router.use('/services',serviceRouter);
router.use('/categories',categoriesRouter);
router.use('/auth', authRouter)

export default router