const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/");
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + file.originalname;
        req.filename = filename;
        cb(null, filename);
    },
});

const TaskerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const fieldname = file.fieldname;
        const uploadPath = `public/${fieldname}/`;
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + file.originalname;
        cb(null, filename);
    },
});

const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        cb(new Error("Only image files!"), false);
    } else {
        cb(null, true);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: { fileSize: 10 * 1024 * 1024 },
});

const taskerUpload = multer({
    storage: TaskerStorage,
    fileFilter: imageFilter,
    limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = { upload, taskerUpload };
// module.exports = taskerUpload;
