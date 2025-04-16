import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { validateDTO } from "@middleware/validation";
import {
    CreateOrderDTO,
    OrderStatus,
    UpdateOrderDTO,
} from "@orders/orders.dto";
import { OrderService } from "@orders/orders.service";
import { ErrorMessages } from "@proj-types/errors";
import { SetDefaultStatus } from "./setDefaultStatus.middleware";

export const orderController = express.Router();

orderController.post(
    "/",
    validateDTO(CreateOrderDTO),
    SetDefaultStatus(OrderStatus.PENDING),
    async (_: Request, response: Response) => {
        try {
            const res = await OrderService.createOrder(
                response.locals.dtoInstance
            );
            response.status(StatusCodes.CREATED).send(res);
        } catch (error) {
            // @ts-ignore only checking specific error case
            if (error?.message === ErrorMessages.INVALID_KEY) {
                response
                    .status(StatusCodes.BAD_REQUEST)
                    .send(ErrorMessages.INVALID_KEY);
            }
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        }
    }
);

orderController.get("/", async (_: Request, response: Response) => {
    try {
        const res = await OrderService.getAllOrders();
        response.status(StatusCodes.OK).send(res);
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
});

orderController.get("/:id", async (request: Request, response: Response) => {
    try {
        const res = await OrderService.getOrderById(request.params.id);
        response.status(StatusCodes.OK).send(res);
    } catch (error) {
        // @ts-ignore only checking specific error case
        if (error?.message === ErrorMessages.INVALID_KEY) {
            response
                .status(StatusCodes.BAD_REQUEST)
                .send(ErrorMessages.INVALID_KEY);
        }
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
});

orderController.get(
    "/status/:status",
    async (request: Request, response: Response) => {
        try {
            if (
                Object.values(OrderStatus).includes(
                    request.params.status as OrderStatus
                )
            ) {
                const res = await OrderService.getByStatus(
                    request.params.status as OrderStatus
                );

                response.status(StatusCodes.OK).send(res);
            } else {
                response
                    .status(StatusCodes.BAD_REQUEST)
                    .send("Not a valid status");
            }
        } catch (error) {
            // @ts-ignore only checking specific error case
            if (error?.message === ErrorMessages.INVALID_KEY) {
                response
                    .status(StatusCodes.BAD_REQUEST)
                    .send(ErrorMessages.INVALID_KEY);
            }
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        }
    }
);

orderController.patch(
    "/advance-status/:id",
    async (request: Request, response: Response) => {
        try {
            const res = await OrderService.advanceStatus(request.params.id);
            response.status(StatusCodes.OK).send(res);
        } catch (error) {
            // @ts-ignore only checking specific error case
            if (error?.message === ErrorMessages.INVALID_KEY) {
                response
                    .status(StatusCodes.BAD_REQUEST)
                    .send(ErrorMessages.INVALID_KEY);
            }
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        }
    }
);

orderController.post("/delete-paid", async (_: Request, response: Response) => {
    try {
        const res = await OrderService.deleteCompleted();
        response.status(StatusCodes.OK).send(res);
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
});

orderController.patch(
    "/:id",
    validateDTO(UpdateOrderDTO),
    async (request: Request, response: Response) => {
        try {
            const res = await OrderService.editOrder(
                request.params.id,
                response.locals.dtoInstance
            );
            response.status(StatusCodes.OK).send(res)
        } catch (error) {
            // @ts-ignore only checking specific error case
            if (error?.message === ErrorMessages.INVALID_KEY) {
                response
                    .status(StatusCodes.BAD_REQUEST)
                    .send(ErrorMessages.INVALID_KEY);
            }
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        }
    }
);
