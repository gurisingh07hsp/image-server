import { Router } from "express";
import { verifyFolder } from "../middleware/folder.middleware.js";
import { uploadImages } from "../controllers/upload.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { verifyApiKey } from "../middleware/apiKey.middleware.js";
import { uploadLimiter } from "../middleware/rateLimit.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = Router();

router.post(
    "/:project/:folder",
    verifyApiKey,
    verifyJWT,
    verifyFolder,
    uploadLimiter,
    upload.array("images", 4),
    uploadImages
);

export default router;