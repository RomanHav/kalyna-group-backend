import multer from "multer";
import path from "path";
import {nanoid} from "nanoid";


// Настраиваем хранилище
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, nanoid(20)+ext);

    },
});


const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed!"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 mb
});

export default upload;
