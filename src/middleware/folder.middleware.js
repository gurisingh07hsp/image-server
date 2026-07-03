import { PROJECTS } from "../config/projects.js";

export const verifyFolder = (req, res, next) => {

    const { project, folder } = req.params;

    const projectConfig = PROJECTS[project];

    if (!projectConfig) {
        return res.status(400).json({
            success: false,
            message: "Invalid project"
        });
    }

    if (!projectConfig.folders.includes(folder)) {
        return res.status(400).json({
            success: false,
            message: "Invalid folder"
        });
    }

    next();
};