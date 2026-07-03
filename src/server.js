import app from "./app.js";
import { cleanupTempFiles } from "./jobs/tempCleanup.job.js";

const PORT = process.env.PORT || 5000;

// Every 30 minutes
setInterval(() => {

    cleanupTempFiles();

}, 30 * 60 * 1000);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`
======================================
🚀 Image Server Started
======================================
Port : ${PORT}
Mode : ${process.env.NODE_ENV}
======================================
`);
});

const shutdown = () => {

    console.log("Gracefully shutting down...");

    server.close(() => {

        console.log("HTTP Server Closed");

        process.exit(0);

    });

};

process.on("SIGINT", shutdown);

process.on("SIGTERM", shutdown);