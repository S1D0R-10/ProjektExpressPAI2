import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

import { DTO } from "@proj-types/DTO";

export class CreateDishDTO extends DTO {
    /**
     * Name of the dish
     */
    @Expose()
    @IsString()
    @IsNotEmpty()
    name!: string;

    /**
     * Description of the dish
     */
    @Expose()
    @IsString()
    @IsNotEmpty()
    description!: string;

    /**
     * Price of the dish
     */
    @Expose()
    @IsNumber()
    @Min(0)
    price!: number;

    /**
     * Category of the dish (e.g., appetizer, main course, dessert)
     */
    @Expose()
    @IsString()
    @IsNotEmpty()
    category!: string;
}

export class UpdateDishDTO extends DTO {
    /**
     * Name of the dish
     */
    @Expose()
    @IsString()
    @IsNotEmpty()
    name?: string;

    /**
     * Description of the dish
     */
    @Expose()
    @IsString()
    @IsNotEmpty()
    description?: string;

    /**
     * Price of the dish
     */
    @Expose()
    @IsNumber()
    @Min(0)
    price?: number;

    /**
     * Category of the dish (e.g., appetizer, main course, dessert)
     */
    @Expose()
    @IsString()
    @IsNotEmpty()
    category?: string;
}
