import type {
    CreateReservationDTO,
    UpdateReservationDTO,
} from "@reservations/reservations.dto";
import { ReservationModel } from "@reservations/reservations.model";
import { ErrorMessages } from "@proj-types/errors";

export class ReservationsService {
    static async addReservation(data: CreateReservationDTO) {
        const reservation = new ReservationModel(data);
        return await reservation.save();
    }

    static async getReservations() {
        return await ReservationModel.find();
    }

    static async getReservationDetails(id: string) {
        const res = await ReservationModel.findById(id);
        if (!res) throw new Error(ErrorMessages.INVALID_KEY);
        return res;
    }

    static async getReservationsFilter(
        filter: Partial<Record<string, string>>
    ) {
        return await ReservationModel.find(filter);
    }

    static async freeReservation(id: string) {
        const deleted = await ReservationModel.findByIdAndDelete(id);
        if (!deleted) throw new Error(ErrorMessages.INVALID_KEY);
        return deleted;
    }

    static async editReservation(id: string, data: UpdateReservationDTO) {
        const updated = await ReservationModel.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!updated) throw new Error(ErrorMessages.INVALID_KEY);
        return updated;
    }
}
