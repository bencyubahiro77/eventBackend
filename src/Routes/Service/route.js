import express from 'express'
import serviceController from '../../controller/serviceController/serviceController.js'
import { authMiddleware } from '../../middleware/authMiddleware.js';
const serviceRouter = express.Router();

// get all services and single services
serviceRouter.route('').get(serviceController.getServices);
serviceRouter.route('/:id').get(serviceController.getServiceById);

// Protected routes for Admin
serviceRouter.route('').post(authMiddleware, serviceController.addService);
serviceRouter.route('/:id').put(authMiddleware, serviceController.updateService);
serviceRouter.route('/:id').delete(authMiddleware, serviceController.deleteService);

// Routes for user actions
serviceRouter.route('/bookservice').post( serviceController.bookService);
serviceRouter.route('/user/bookings/:userId').get(serviceController.getUserBookedService);
serviceRouter.route('/cancelservice').delete(serviceController.cancelBookedService);

export default serviceRouter;