import { PROJECTS } from "../config/projects.js";

export const verifyApiKey = (req, res, next) => {

    const apiKey = req.headers["x-api-key"];

    console.log("API Key : ", apiKey);

    

    const { project } = req.params;

    const projectConfig = PROJECTS[project];

    if (!projectConfig) {
        return res.status(400).json({
            success: false,
            message: "Invalid project"
        });
    }


    if (projectConfig.apiKey !== apiKey) {
        return res.status(401).json({
            success: false,
            message: "Invalid API Key"
        });
    }

    next();
};