import jwt from "jsonwebtoken";
import { PROJECTS } from "../config/projects.js";
export const verifyJWT = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const token = authHeader.split(" ")[1];
        const { project } = req.params;

        const projectConfig = PROJECTS[project];

        if (!projectConfig) {
            return res.status(400).json({
                success: false,
                message: "Invalid project"
            });
        }

        const decoded = jwt.verify(token, projectConfig.jwtSecret);


        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });

    }
};