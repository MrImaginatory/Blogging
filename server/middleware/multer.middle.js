import { error } from "console";
import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const filterFile = (req, file, cb) => {
    const allowedTypes = /jpg|jpeg|png/;
    const isValidType = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const isMimeType = allowedTypes.test(file.mimetype);

    if (isValidType && isMimeType) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed"), false);
    }
};

const upload = multer({
    storage:storage,
    fileFilter:filterFile,
    limits:{fileSize: 10 * 1024 * 1024}
});

export default upload;