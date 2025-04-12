import { CreateDishDTO, UpdateDishDTO } from "@menu/menu.dto";
import { MenuModel } from "@menu/menu.model";
import { ErrorMessages } from "@proj-types/errors";

// Mock in-memory storage for development without MongoDB
const mockDishes = new Map();
let nextId = 1;

export class MenuService {
    static async createDish(dish: CreateDishDTO) {
        try {
            if (process.env.SKIP_DB === "true") {
                const id = String(nextId++);
                const newDish = { 
                    _id: id,
                    ...dish 
                };
                mockDishes.set(id, newDish);
                return newDish;
            }
            
            const newDish = new MenuModel(dish);
            return await newDish.save();
        } catch (e: unknown) {
            //@ts-ignore only checking specific error value
            if (e?.code === 11000) {
                throw new Error(ErrorMessages.DUPLICATE_VALUE);
            }
            throw e;
        }
    }

    static async getAllDishes() {
        if (process.env.SKIP_DB === "true") {
            return Array.from(mockDishes.values());
        }
        return await MenuModel.find();
    }

    static async getDishById(id: string) {
        if (process.env.SKIP_DB === "true") {
            const dish = mockDishes.get(id);
            if (dish) {
                return dish;
            }
            throw new Error(ErrorMessages.INVALID_KEY);
        }
        
        const dish = await MenuModel.findById(id);
        if (dish) {
            return dish;
        }
        throw new Error(ErrorMessages.INVALID_KEY);
    }

    static async updateDish(id: string, dishData: UpdateDishDTO) {
        if (process.env.SKIP_DB === "true") {
            const dish = mockDishes.get(id);
            if (!dish) {
                throw new Error(ErrorMessages.INVALID_KEY);
            }
            
            const updatedDish = { 
                ...dish, 
                ...dishData 
            };
            mockDishes.set(id, updatedDish);
            return updatedDish;
        }
        
        const dish = await MenuModel.findByIdAndUpdate(
            id,
            dishData,
            { new: true, runValidators: true }
        );
        
        if (dish) {
            return dish;
        }
        throw new Error(ErrorMessages.INVALID_KEY);
    }

    static async deleteDish(id: string) {
        if (process.env.SKIP_DB === "true") {
            const dish = mockDishes.get(id);
            if (!dish) {
                throw new Error(ErrorMessages.INVALID_KEY);
            }
            
            mockDishes.delete(id);
            return dish;
        }
        
        const result = await MenuModel.findByIdAndDelete(id);
        if (result) {
            return result;
        }
        throw new Error(ErrorMessages.INVALID_KEY);
    }
} 