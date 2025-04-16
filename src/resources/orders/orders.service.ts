import { OrderModel } from "@orders/orders.model";
import { ErrorMessages } from "@proj-types/errors";
import {
    CreateOrderDTO,
    OrderStatus,
    UpdateOrderDTO,
} from "@orders/orders.dto";

export class OrderService {
    static async getAllOrders() {
        return await OrderModel.find();
    }

    static async getOrderById(id: string) {
        const res = await OrderModel.findById(id);
        if (!res) throw new Error(ErrorMessages.INVALID_KEY);
        return res;
    }

    static async getByStatus(status: OrderStatus) {
        return await OrderModel.find({
            status,
        }).find();
    }

    static async advanceStatus(id: string) {
        const res = await OrderModel.findById(id);
        if (!res) {
            throw new Error(ErrorMessages.INVALID_KEY);
        } else {
            res.status =
                res.status === OrderStatus.PENDING
                    ? OrderStatus.FULFILLED
                    : OrderStatus.PAID;
            return await res.save();
        }
    }

    static async createOrder(data: CreateOrderDTO) {
        const order = new OrderModel(data);
        return await order.save();
    }

    static async deleteCompleted() {
        const res = await OrderModel.deleteMany({ status: OrderStatus.PAID });
        return `Deleted ${res?.deletedCount ?? 0} completed orders`;
    }

    static async editOrder(id: string, data: UpdateOrderDTO) {
        const updated = await OrderModel.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!updated) throw new Error(ErrorMessages.INVALID_KEY);
        return updated;
    }
}
