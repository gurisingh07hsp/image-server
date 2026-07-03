import { Router } from "express";

import { deleteImage } from "../controllers/image.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js";
import { verifyApiKey } from "../middleware/apiKey.middleware.js";
import { verifyFolder } from "../middleware/folder.middleware.js";

const router = Router();

router.delete(
    "/:project/:folder/:filename",
    verifyApiKey,
    verifyJWT,
    verifyFolder,
    deleteImage
);

export default router;