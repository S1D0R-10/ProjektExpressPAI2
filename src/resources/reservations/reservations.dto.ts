import { Expose } from "class-transformer";
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";
import { DTO } from "@proj-types/DTO";

export enum ReservationStatus {
    ACTIVE = "active",
    CANCELLED = "cancelled",
    COMPLETED = "completed"
}

export class CreateReservationDTO extends DTO {
    @Expose()
    @IsString()
    @IsNotEmpty()
    tableId!: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    clientName!: string;

    @Expose()
    @IsInt()
    @Min(1)
    guests!: number;

    @Expose()
    @IsDateString()
    date!: string;

    @Expose()
    @IsOptional()
    @IsString()
    notes?: string;

    @Expose()
    @IsEnum(ReservationStatus)
    status!: ReservationStatus;
}

export class UpdateReservationDTO extends DTO {
    @Expose()
    @IsOptional()
    @IsString()
    clientName?: string;

    @Expose()
    @IsOptional()
    @IsInt()
    @Min(1)
    guests?: number;

    @Expose()
    @IsOptional()
    @IsDateString()
    date?: string;

    @Expose()
    @IsOptional()
    @IsString()
    notes?: string;

    @Expose()
    @IsOptional()
    @IsEnum(ReservationStatus)
    status?: ReservationStatus;
}
