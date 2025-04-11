import { Expose } from "class-transformer";
import { IsInt, Max, Min } from "class-validator";

import { DTO } from "@proj-types/DTO";

export class CreateTableDTO extends DTO {
    /**
     * Number of the table within the restaurant
     */
    @Expose()
    @IsInt()
    @Min(1)
    number!: number;

    /**
     * Maximum number of people at a table
     */
    @Expose()
    @IsInt()
    @Min(1)
    @Max(32)
    max_people!: number;
}
