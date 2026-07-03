import fs from "fs-extra";
import path from "path";

import { success, error } from "../utils/response.js";

export const deleteImage = async (req, res) => {

    try {

        const { project, folder, filename } = req.params;

        const imagePath = path.join(
            "storage",
            "images",
            project,
            folder,
            filename
        );

        const exists = await fs.pathExists(imagePath);

        if (!exists) {
            return error(res, "Image not found", 404);
        }

        await fs.remove(imagePath);

        return success(
            res,
            {},
            "Image deleted"
        );

    } catch (err) {

        return error(res, err.message);

    }

};