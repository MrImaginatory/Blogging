import Router from "express";
import { loginController, logoutController, signupController } from "../controllers/login.controller.js";

const authRouter = Router();

authRouter.route('/login').post(loginController);
authRouter.route('/signUp').post(signupController);
authRouter.route('/logOut').post(logoutController);

export default authRouter;