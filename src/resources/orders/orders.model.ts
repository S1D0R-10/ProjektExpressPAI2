import mongoose, { Schema } from "mongoose";

import { REQ, STR } from "@consts/mongoose-field-declarations";
import { OrderStatus, PaymentType } from "@orders/orders.dto";

export interface IOrder extends mongoose.Document {
    reservationId: mongoose.Types.ObjectId;
    status: OrderStatus;
    orderedItems: mongoose.Types.ObjectId[];
    paymentType: PaymentType;
}

const OrderSchema = new mongoose.Schema<IOrder>({
    reservationId: {
        type: Schema.Types.ObjectId,
        ref: "Reservations",
        ...REQ,
    },
    status: {
        ...STR,
        ...REQ,
        enum: ["pending", "fulfilled", "paid"],
    },
    orderedItems: [
        {
            type: Schema.Types.ObjectId,
            ref: "Menu",
            ...REQ,
        },
    ],
    paymentType: {
        ...STR,
        ...REQ,
        enum: ["cash", "card", "cheque"],
    },
});

export const OrderModel = mongoose.model<IOrder>("Orders", OrderSchema);
