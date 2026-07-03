import { rateLimit } from "express-rate-limit";

export const uploadLimiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 50,

    message: {
        success: false,
        message: "Too many uploads. Please try again later."
    }

});