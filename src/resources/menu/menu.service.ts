import { CreateDishDTO, UpdateDishDTO } from "@menu/menu.dto";
import { MenuModel } from "@menu/menu.model";
import { ErrorMessages } from "@proj-types/errors";

export class MenuService {
    static async createDish(dish: CreateDishDTO) {
        const dishDoc = new MenuModel(dish);
        return await dishDoc.save();
    }

    static async getAllDishes() {
        return await MenuModel.find();
    }

    static async getDishById(id: string) {
        const dish = await MenuModel.findById(id);
        if (dish) {
            return dish;
        } else {
            throw new Error(ErrorMessages.INVALID_KEY);
        }
    }

    static async updateDish(id: string, dishData: UpdateDishDTO) {
        const dish = await MenuModel.findByIdAndUpdate(id, dishData, {
            new: true,
            runValidators: true,
        });
        return dish;
    }

    static async deleteDish(id: string) {
        const result = await MenuModel.findByIdAndDelete(id);
        if (result) {
            return result;
        } else {
            throw new Error(ErrorMessages.INVALID_KEY);
        }
    }
}