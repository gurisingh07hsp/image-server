import multer from "multer";
import path from "path";
import fs from "fs";

const tempDir = "storage/temp";

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({

    destination(req, file, cb) {
        cb(null, tempDir);
    },

    filename(req, file, cb) {

        const unique =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9);

        cb(
            null,
            unique + path.extname(file.originalname)
        );
    }

});


const fileFilter = (req, file, cb) => {

    const allowedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/avif"
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
        const error = new Error("Only JPG, PNG, WEBP and AVIF images are allowed.");
        error.statusCode = 400;
        return cb(error);
    }

    cb(null, true);
};

export const upload = multer({

    storage,

    limits: {
        fileSize: Number(process.env.MAX_FILE_SIZE),
        files: Number(process.env.MAX_FILES)
    },

    fileFilter

});