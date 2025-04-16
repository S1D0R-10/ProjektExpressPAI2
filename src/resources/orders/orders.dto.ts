import { Expose } from "class-transformer";
import {
    ArrayMinSize,
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsString,
} from "class-validator";

import { DTO } from "@proj-types/DTO";

export enum OrderStatus {
    PENDING = "pending",
    FULFILLED = "fulfilled",
    PAID = "paid",
}

export enum PaymentType {
    CASH = "cash",
    CARD = "card",
    CHEQUE = "cheque",
}

export class CreateOrderDTO extends DTO {
    @Expose()
    @IsString()
    @IsNotEmpty()
    reservationId!: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    status!: OrderStatus.PENDING;

    @Expose()
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    @IsNotEmpty()
    orderedItems!: string[];

    @Expose()
    @IsEnum(PaymentType)
    @IsNotEmpty()
    paymentType!: PaymentType;
}

export class UpdateOrderDTO extends DTO {
    @Expose()
    @IsString()
    @IsNotEmpty()
    reservationId?: string;

    @Expose()
    @IsEnum(OrderStatus)
    @IsNotEmpty()
    status?: OrderStatus;

    @Expose()
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    @IsNotEmpty()
    orderedItems?: string[];

    @Expose()
    @IsEnum(PaymentType)
    @IsNotEmpty()
    paymentType?: PaymentType;
}
