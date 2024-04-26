import express from 'express'
import categoryController from '../../controller/CategoryController/categoryController.js'
import { authMiddleware } from '../../middleware/authMiddleware.js';
const categoriesRouter = express.Router();

categoriesRouter.route('').get(categoryController.getCategories).post(authMiddleware, categoryController.addCategory);

export default categoriesRouter