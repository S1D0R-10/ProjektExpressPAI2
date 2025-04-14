import mongoose, { Schema } from "mongoose";
import { REQ, STR, NUM, MIN } from "@consts/mongoose-field-declarations";

export interface IReservation extends mongoose.Document {
    tableId: mongoose.Types.ObjectId;
    clientName: string;
    guests: number;
    date: Date;
    notes?: string;
    status: "active" | "cancelled" | "completed";
}

const ReservationSchema = new mongoose.Schema<IReservation>({
    tableId: {
        type: Schema.Types.ObjectId,
        ref: "Tables",
        required: true
    },
    clientName: { ...STR, ...REQ },
    guests: { ...NUM, ...REQ, ...MIN(1) },
    date: { type: Date, ...REQ },
    notes: { ...STR },
    status: { ...STR, ...REQ, enum: ["active", "cancelled", "completed"] }
});

export const ReservationModel = mongoose.model<IReservation>("Reservations", ReservationSchema);
