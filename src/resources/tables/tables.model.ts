import mongoose from "mongoose";

import { REQ, NUM, MIN, MAX, UNIQUE } from "@consts/mongoose-field-declarations";

export interface ITable extends mongoose.Document {
    number: number,
    max_people: number,
}

const TableSchema = new mongoose.Schema<ITable>({
    number: {...NUM, ...REQ, ...MIN(1), ...UNIQUE},
    max_people: {...NUM, ...REQ, ...MIN(1), ...MAX(32)}
});

export const TablesModel = mongoose.model<ITable>("Tables", TableSchema)