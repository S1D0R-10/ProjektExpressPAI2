import express from "express";
import { StatusCodes } from "http-status-codes";

import {
    CreateReservationDTO,
    UpdateReservationDTO,
} from "@reservations/reservations.dto";
import { validateDTO } from "@middleware/validation";
import { ReservationsService } from "@reservations/reservations.service";
import { ErrorMessages } from "@proj-types/errors";

export const reservationController = express.Router();

reservationController.post(
    "/",
    validateDTO(CreateReservationDTO),
    async (req, res) => {
        try {
            const result = await ReservationsService.addReservation(
                res.locals.dtoInstance
            );
            res.status(StatusCodes.CREATED).send(result);
        } catch {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        }
    }
);

reservationController.get("/", async (_, res) => {
    const data = await ReservationsService.getReservations();
    res.status(StatusCodes.OK).send(data);
});

reservationController.get("/by-id/:id", async (req, res) => {
    try {
        const data = await ReservationsService.getReservationDetails(
            req.params.id
        );
        res.status(StatusCodes.OK).send(data);
    } catch {
        res.status(StatusCodes.BAD_REQUEST).send(ErrorMessages.INVALID_KEY);
    }
});

reservationController.get("/filter", async (req, res) => {
    const filter = req.query as Partial<Record<string, string>>;
    const data = await ReservationsService.getReservationsFilter(filter);
    res.status(StatusCodes.OK).send(data);
});

reservationController.delete("/:id", async (req, res) => {
    try {
        await ReservationsService.freeReservation(req.params.id);
        res.status(StatusCodes.NO_CONTENT).send();
    } catch {
        res.status(StatusCodes.BAD_REQUEST).send(ErrorMessages.INVALID_KEY);
    }
});

reservationController.patch(
    "/:id",
    validateDTO(UpdateReservationDTO),
    async (req, res) => {
        try {
            const updated = await ReservationsService.editReservation(
                req.params.id,
                res.locals.dtoInstance
            );
            res.status(StatusCodes.OK).send(updated);
        } catch {
            res.status(StatusCodes.BAD_REQUEST).send(ErrorMessages.INVALID_KEY);
        }
    }
);
