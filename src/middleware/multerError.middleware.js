import multer from "multer";

export const multerErrorHandler = (err, req, res, next) => {

    if (err instanceof multer.MulterError) {

        switch (err.code) {

            case "LIMIT_FILE_SIZE":
                return res.status(400).json({
                    success: false,
                    message: `Maximum file size is ${process.env.MAX_FILE_SIZE / 1024 / 1024} MB`
                });

            case "LIMIT_FILE_COUNT":
                return res.status(400).json({
                    success: false,
                    message: `You can upload a maximum of ${process.env.MAX_FILES} images`
                });

            case "LIMIT_UNEXPECTED_FILE":
                return res.status(400).json({
                    success: false,
                    message: "Unexpected file field"
                });

            case "LIMIT_PART_COUNT":
                return res.status(400).json({
                    success: false,
                    message: "Too many form fields"
                });

            default:
                return res.status(400).json({
                    success: false,
                    message: err.message
                });

        }

    }

    if (err.statusCode) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    next(err);

};