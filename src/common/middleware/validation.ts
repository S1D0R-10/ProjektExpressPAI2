import { type ClassConstructor, plainToInstance } from "class-transformer";
import type { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { StatusCodes } from "http-status-codes";

import { DTO } from "@proj-types/DTO";

/**
 * @param DtoClass Takes the DTO to validate request body against
 * @returns Returns a middleware to use before an endpoint handler. Middleware adds validated DTO instance to `response.locals.dtoInstance` if data is vaid, sends a `400` if the data is malformed / invalid, or a `500` if an internal error occurs
 * @example `app.post("/", validateDTO(todo), createTodoHandler)`
 */
export const validateDTO =
    <T extends DTO>(DtoClass: ClassConstructor<T>) =>
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            console.log('Validating request body:', request.body);
            const dto: T = plainToInstance(DtoClass, request.body, {
                excludeExtraneousValues: true,
                exposeDefaultValues: true
            });
            
            console.log('DTO after transform:', dto);
            const errors = await validate(dto);
            console.log('Validation errors:', errors);

            if (errors.length > 0) {
                console.log('Validation failed:', errors);
                response.status(StatusCodes.BAD_REQUEST).send();
            } else {
                console.log('Validation passed, setting dtoInstance:', dto);
                response.locals.dtoInstance = dto;
                next();
            }
        } catch (error) {
            console.error('Validation error:', error);
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        }
    };
