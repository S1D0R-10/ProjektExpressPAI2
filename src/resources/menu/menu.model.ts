import mongoose from "mongoose";

import { REQ, STR, NUM, MIN } from "@consts/mongoose-field-declarations";

export interface IDish extends mongoose.Document {
    name: string;
    description: string;
    price: number;
    category: string;
}

const DishSchema = new mongoose.Schema<IDish>({
    name: { ...STR, ...REQ },
    description: { ...STR, ...REQ },
    price: { ...NUM, ...REQ, ...MIN(0) },
    category: { ...STR, ...REQ },
});

export const MenuModel = mongoose.model<IDish>("Menu", DishSchema);
