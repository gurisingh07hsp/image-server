import sharp from "sharp";
import fs from "fs-extra";
import path from "path";
import { randomUUID } from "crypto";

export const optimizeImages = async (
    files,
    project,
    folder
) => {

    const urls = [];

    const destination = path.join(
        "storage",
        "images",
        project,
        folder
    );

    await fs.ensureDir(destination);
    try{
            for (const file of files) {

        const filename = randomUUID() + ".webp";

        const output = path.join(destination, filename);

        await sharp(file.path)

            .rotate()

            .resize({
                width: 1920,
                withoutEnlargement: true
            })

            .webp({
                quality: 80
            })

            .toFile(output);

        await fs.remove(file.path);

        urls.push(
            `${process.env.BASE_URL}/images/${project}/${folder}/${filename}`
        );
    }
    return urls;

    } finally {
        for (const file of files) {

            try {
                await fs.remove(file.path);
            } catch (err) {
                console.error(
                    "Failed to remove temp file:",
                    file.path
                );
            }

        }
    }


};