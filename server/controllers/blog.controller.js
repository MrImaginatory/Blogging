import Blog from "../model/blog.model.js";
import User from "../model/user.model.js";

const createBlogController = async(req,res) =>{
    try {
        const {Title,Description} = req.body;
        const userId = req.user?.userid;
        const isVerified = req.user?.isVerified;

        if(!userId){
            return res.json(401).json({message:"Unauthorized User"})
        }

        if(!isVerified){
            return res.json(401).json({message:"UnVerified User Please Complete Verification First"})
        }

        let filename ="";
        let imagePath="";

        if(req.file){
            filename=req.file.filename;
            imagePath=req.file.path; 
        }

        const blogData = new Blog({
            BlogTitle:Title,
            BlogDescription:Description,
            BlogImage:filename,
            BlogImagePath:imagePath,
            CreatedBy:userId,
        });

        const newBlog = await blogData.save();
        const updateUserBlogs = await User.findByIdAndUpdate(userId,
            {$push:{blogsId: newBlog._id}},
            {new:true},
        );

        if(newBlog&&updateUserBlogs){
            return res.status(201).json({message:"New Blog Created Successfully",Blog:newBlog});
        }

        return res.status(401).json({message:"Error Creating Blog"});

    } catch (error) {
        console.error("Error creating blog or updating user:", error);
        return res.status(401).json({message:"Error creating Blog"});
        
    }
}

const updateBlogController = async(req,res) =>{
    try {
        const {id} = req.params.id;
        const {Title,Description} = req.body;
        const userId = req.user?.userid;
        const isVerified = req.user?.isVerified;

        if(!userId){
            return res.json(401).json({message:"Unauthorized User"})
        }

        if(!isVerified){
            return res.json(401).json({message:"UnVerified User Please Complete Verification First"})
        }

        let filename="";
        let imagePath="";

        if(req.file){
            filename=req.file.filename;
            imagePath=req.file.path; 
        }

        if(!Title||!Description){
            return res.status(404).json({message:"Every Field is Required!"});
        }

        const newBlog = new Blog({
            BlogTitle:Title,
            BlogDescription:Description,
            BlogImage:filename,
            BlogImagePath:imagePath
        })

        const findBlog = await Blog.findById(id);

        if(userId!==findBlog.CreatedBy.toString()){
            return res.status(401).json({message:"You are Unauthorized to update this Blog"});
        }

        const updatedBlog = await Blog.findByIdAndUpdate(id,newBlog,{new:true});

        if(!updatedBlog){
            return res.status(401).json({message:"Failed to update Blog"});
        }

        return res.status(200).json({message:"Blog Updated Successfully"});

    } catch (error) {
        console.log("Error in Update:",error);
        return res.status(401).json({message:"Error updating Blog"})
    }
}

const deleteBlogController = async(req,res) =>{
    try {
        const blogId = req.params.id;
        const userId = req.user?.userid;
        const isVerified = req.user?.isVerified;

        if(!userId){
            return res.status(401).json({message:"Unauthorized Login First!"});
        }

        if(!isVerified){
            return res.json(401).json({message:"UnVerified User Please Complete Verification First"})
        }

        const blog = await Blog.findById(blogId);

        if(!blog){
            return res.status(404).json({message:"Blog Not Found"});
        }

        if(blog.CreatedBy.toString() !== userId){
            return res.status(403).json({message:"Your are Not authorized to delete the blog"});
        }

        const deletedBlog = await Blog.findByIdAndDelete(blogId);
        const removeFromUser = await User.findByIdAndUpdate(userId,
            { $pull:{blogsId:blogId}},
            {new:true},
        )
        if(!deletedBlog){
            return res.status(401).json({message:"Error deleting Blog!"});
        }
        if (!removeFromUser) {
            await Blog.create(deletedBlog);
            return res.status(400).json({ message: "Failed to update user's blogs. Blog deletion rolled back." });
        }

        return res.status(200).json({message:"Blog Deleted Successfully"});
    } catch (error) {
        console.log("Error Deleting Blog:",error);
        return res.status(401).json({message:"Error Deleting Blog"});
    }
}

const allBlogController = async (req, res) => {
    try {

        const page = req.query.page || 1 ;
        const limit = req.query.limit || 10 ;
        const skip = (page - 1) * limit ;

        const allBlogs = await Blog.find().skip(skip).limit(limit);
        const totalBlogs = await Blog.countDocuments();

        if (allBlogs.length === 0) {
            return res.status(404).json({ message: "No Blogs Found!" });
        }

        return res.status(200).json({ success:true,
                                        totalBlogs:totalBlogs,
                                        totalPages:Math.ceil(totalBlogs/limit),
                                        currentPage:page,
                                        DataLimit:limit,
                                        blogs: allBlogs });
    } catch (error) {
        console.error("Error Loading Blogs:", error);
        return res.status(500).json({ message: "An error occurred while loading blogs." });
    }
};

export {createBlogController,updateBlogController,deleteBlogController,allBlogController};