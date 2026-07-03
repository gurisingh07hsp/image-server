export const PROJECTS = {
    proputy: {
        apiKey: process.env.PROPUTY_API_KEY,
        jwtSecret: process.env.PROPUTY_JWT_SECRET,
        folders: [
            "users",
            "properties",
            "blogs",
            "documents"
        ]
    },
};