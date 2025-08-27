import multer from "multer";

const MIME_TYPE_MAP = {
    'image/jpg':'jpg',
    'image/jpeg':'jpg',
    'image/png':'png'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/products");
    },
    filename: (req, file, cb) => {
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    }
});

const multerConfig = multer({ storage: storage });

export default multerConfig;
