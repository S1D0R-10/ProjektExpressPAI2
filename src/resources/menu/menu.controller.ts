import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { CreateDishDTO, UpdateDishDTO } from "@menu/menu.dto";
import { validateDTO } from "@middleware/validation";
import { MenuService } from "@menu/menu.service";
import { ErrorMessages } from "@proj-types/errors";
import { IDish } from "@menu/menu.model";
import mongoose from "mongoose";

export const menuController = express.Router();

// GET /menu - Get all dishes
menuController.get("/", async (_: Request, response: Response<IDish[] | undefined>) => {
    try {
        const dishes: IDish[] = await MenuService.getAllDishes();
        response.status(StatusCodes.OK).send(dishes);
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
});

// GET /menu/:id - Get dish by ID
menuController.get("/:id", async (request: Request<{id: string}>, response: Response<IDish | string | undefined>) => {
    try {
        const { id } = request.params;
        const dish: IDish = await MenuService.getDishById(id);
        response.status(StatusCodes.OK).send(dish);
    } catch (error: any) {
        if (error?.message === ErrorMessages.INVALID_KEY) {
            response
                .status(StatusCodes.NOT_FOUND)
                .send(ErrorMessages.INVALID_KEY);
        } else {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        }
    }
});

// POST /menu - Add a new dish
menuController.post(
    "/",
    validateDTO(CreateDishDTO),
    async (_: Request, response: Response<IDish | undefined>) => {
        try {
            const dish: IDish = await MenuService.createDish(
                response.locals.dtoInstance as CreateDishDTO
            );
            response.status(StatusCodes.CREATED).send(dish);
        } catch (error: any) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        }
    }
);

// PATCH /menu/:id - Update a dish
menuController.patch(
    "/:id",
    validateDTO(UpdateDishDTO),
    async (request: Request<{id: string}>, response: Response<IDish | string | undefined>) => {
        try {
            const { id } = request.params;
            const updatedDish: IDish | null = await MenuService.updateDish(
                id,
                response.locals.dtoInstance as UpdateDishDTO
            );
            response.status(StatusCodes.OK).send(updatedDish as IDish);
        } catch (error: any) {
            if (error?.message === ErrorMessages.INVALID_KEY) {
                response
                    .status(StatusCodes.NOT_FOUND)
                    .send(ErrorMessages.INVALID_KEY);
            } else {
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
            }
        }
    }
);

// DELETE /menu/:id - Delete a dish
menuController.delete("/:id", async (request: Request<{id: string}>, response: Response<IDish | string | undefined>) => {
    try {
        const { id } = request.params;
        await MenuService.deleteDish(id);
        response.status(StatusCodes.NO_CONTENT).send();
    } catch (error: any) {
        if (error?.message === ErrorMessages.INVALID_KEY) {
            response
                .status(StatusCodes.NOT_FOUND)
                .send(ErrorMessages.INVALID_KEY);
        } else {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        }
    }
});