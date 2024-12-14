import Blog from "../model/blog.model.js";

const createBlogController = async(req,res) =>{
    try {
        const {Title,Description} = req.body;
        
        const userId = req.user.userid;
console.log(userId);

        let filename ="";
        let imagePath="";

        if(req.file){
            filename=req.file.filename;
            imagePath=req.file.path; 
        }

        const newBlog = new Blog({
            BlogTitle:Title,
            BlogDescription:Description,
            BlogImage:filename,
            BlogImagePath:imagePath,
            CreatedBy:userId,
        });

        await newBlog.save();

        res.status(201).json({message:"New Blog Created Successfully"});

    } catch (error) {
        console.log("Error Creating Blog:",error);
        res.status(401).json({message:"Error creating Blog"});
        
    }
}

export {createBlogController};