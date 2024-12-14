import Router from "express";
import { loginController, logoutController, signupController } from "../controllers/login.controller.js";

const authRouter = Router();

authRouter.route('/login').post(loginController);
authRouter.route('/signup').post(signupController);
authRouter.route('/logOut').post(logoutController);

export default authRouter;