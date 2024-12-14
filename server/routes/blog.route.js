import Router from "express";
import { createBlogController } from "../controllers/blog.controller.js";
import verifyJwt from "../middleware/verify.middle.js";

const blogRoute = Router();

blogRoute.route('/create').post(verifyJwt,createBlogController);

export default blogRoute;