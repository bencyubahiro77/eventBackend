import express from 'express';
import AuthController from '../../controller/Auth/AuthController.js'
const authRouter = express.Router();

authRouter.route('/login').post(AuthController.login);

export default authRouter