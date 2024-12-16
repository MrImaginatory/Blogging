import Router from "express";
import { createBlogController, deleteBlogController, updateBlogController, allBlogController } from "../controllers/blog.controller.js";
import upload from "../middleware/multer.middle.js"

const blogRoute = Router();

blogRoute.route('/create').post(upload.single('filename'),createBlogController);
blogRoute.route('/update/:id').post(upload.single('filename'),updateBlogController);
blogRoute.route('/delete/:id').delete(deleteBlogController);
blogRoute.route('/allBlogs').get(allBlogController);

export default blogRoute;