import { Expose } from "class-transformer";
import {
    ArrayMinSize,
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsOptional,
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
    @IsOptional()
    reservationId?: string;

    @Expose()
    @IsEnum(OrderStatus)
    @IsOptional()
    status?: OrderStatus;

    @Expose()
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    orderedItems?: string[];

    @Expose()
    @IsEnum(PaymentType)
    @IsOptional()
    paymentType?: PaymentType;
}
