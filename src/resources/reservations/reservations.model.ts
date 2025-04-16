import mongoose, { Schema } from "mongoose";

import { REQ, STR, NUM, MIN } from "@consts/mongoose-field-declarations";
import { ReservationStatus } from "@reservations/reservations.dto";

export interface IReservation extends mongoose.Document {
    tableId: mongoose.Types.ObjectId;
    clientName: string;
    guests: number;
    date: Date;
    notes?: string;
    status: ReservationStatus;
}

const ReservationSchema = new mongoose.Schema<IReservation>({
    tableId: {
        type: Schema.Types.ObjectId,
        ref: "Tables",
        ...REQ,
    },
    clientName: { ...STR, ...REQ },
    guests: { ...NUM, ...REQ, ...MIN(1) },
    date: { type: Date, ...REQ },
    notes: { ...STR },
    status: { ...STR, ...REQ, enum: ["active", "cancelled", "completed"] },
});

export const ReservationModel = mongoose.model<IReservation>(
    "Reservations",
    ReservationSchema
);
