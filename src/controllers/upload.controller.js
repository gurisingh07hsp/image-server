import { optimizeImages } from "../services/image.service.js";

export const uploadImages = async (req, res) => {
    try {
        const { project, folder } = req.params;

        const urls = await optimizeImages(
            req.files,
            project,
            folder
        );

        return res.status(201).json({
            success: true,
            images: urls,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};