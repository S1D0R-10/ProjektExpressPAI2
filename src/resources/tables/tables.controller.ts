import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { CreateTableDTO } from "@tables/tables.dto";
import { validateDTO } from "@middleware/validation";
import { TablesService } from "@tables/tables.service";
import { ErrorMessages } from "@proj-types/errors";

export const tableController = express.Router();

tableController.get("/", async (_: Request, response: Response) => {
    const tables = await TablesService.getAllTables();
    response.status(StatusCodes.OK).send(tables);
});

tableController.post(
    "/",
    validateDTO(CreateTableDTO),
    async (_: Request, response: Response) => {
        try {
            const table = await TablesService.createTable(
                response.locals.dtoInstance
            );
            response.status(StatusCodes.CREATED).send(table);
        } catch (error: unknown) {
            //@ts-ignore only checking for specific value
            if (error?.message === ErrorMessages.DUPLICATE_VALUE) {
                response
                    .status(StatusCodes.BAD_REQUEST)
                    .send(ErrorMessages.DUPLICATE_VALUE);
            } else {
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
            }
        }
    }
);

tableController.delete("/:id", async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        await TablesService.deleteTable(id);
        response.status(StatusCodes.NO_CONTENT).send();
    } catch (error: unknown) {
        //@ts-ignore only checking for specific value
        if (error?.message === ErrorMessages.INVALID_KEY) {
            response
                .status(StatusCodes.BAD_REQUEST)
                .send(ErrorMessages.INVALID_KEY);
        } else {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        }
    }
});
