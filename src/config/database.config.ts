import mongoose from "mongoose";
import { ENV } from "./env";

export const connection = async () => {
    try {
        await mongoose.connect(ENV.DATABASE.URI);
        console.log("DB CONNECTED");
    } catch (error) {
        console.error(`DB ERROR: ${error}`);
        process.exit(69);
    }
};
