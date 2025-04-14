import type { CreateReservationDTO, UpdateReservationDTO } from "@reservations/reservations.dto";
import { ReservationModel } from "@reservations/reservations.model";
import { ErrorMessages } from "@proj-types/errors";

export const ReservationsService = {
    async addReservation(data: CreateReservationDTO) {
        const reservation = new ReservationModel(data);
        return await reservation.save();
    },

    async getReservations() {
        return await ReservationModel.find();
    },

    async getReservationDetails(id: string) {
        const res = await ReservationModel.findById(id);
        if (!res) throw new Error(ErrorMessages.INVALID_KEY);
        return res;
    },

    async getReservationsFilter(filter: Partial<Record<string, string>>) {
        return await ReservationModel.find(filter);
    },

    async freeReservation(id: string) {
        const deleted = await ReservationModel.findByIdAndDelete(id);
        if (!deleted) throw new Error(ErrorMessages.INVALID_KEY);
        return deleted;
    },

    async editReservation(id: string, data: UpdateReservationDTO) {
        const updated = await ReservationModel.findByIdAndUpdate(id, data, { new: true });
        if (!updated) throw new Error(ErrorMessages.INVALID_KEY);
        return updated;
    }
};
