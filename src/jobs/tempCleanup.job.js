import fs from "fs-extra";
import path from "path";

const TEMP_DIR = path.join("storage", "temp");

export const cleanupTempFiles = async () => {

    try {

        const files = await fs.readdir(TEMP_DIR);

        const now = Date.now();

        for (const file of files) {

            const filePath = path.join(
                TEMP_DIR,
                file
            );

            const stats = await fs.stat(filePath);

            // Delete files older than 30 minutes
            if (
                now - stats.mtimeMs >
                30 * 60 * 1000
            ) {

                await fs.remove(filePath);

                console.log("Deleted:", file);

            }

        }

    } catch (err) {

        console.error(err);

    }

};