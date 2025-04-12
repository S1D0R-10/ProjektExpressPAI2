import mongoose from "mongoose";

import { ENV } from "@config/env";

export const connection = async () => {
    // Check if we're in development mode and want to skip DB connection
    const skipDB = process.env.SKIP_DB === "true";
    
    if (skipDB) {
        console.log("SKIPPING DB CONNECTION (Development Mode)");
        return;
    }
    
    try {
        await mongoose.connect(ENV.DATABASE.URI);
        console.log("DB CONNECTED");
    } catch (error) {
        console.error(`DB ERROR: ${error}`);
        process.exit(69);
    }
};
