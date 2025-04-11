import { CreateTableDTO } from "@tables/tables.dto";
import { TablesModel } from "@tables/tables.model";
import { ErrorMessages } from "@proj-types/errors";

export class TablesService {
    static async createTable(tab: CreateTableDTO) {
        try {
            const table = new TablesModel(tab);
            return await table.save();
        } catch (e: unknown) {
            //@ts-ignore only checking specific error value
            if (e?.code === 11000) {
                throw new Error(ErrorMessages.DUPLICATE_VALUE);
            }
        }
    }

    static async getAllTables() {
        return await TablesModel.find();
    }

    static async deleteTable(id: string) {
        const result = await TablesModel.findByIdAndDelete(id);
        if (result) {
            return result;
        } else {
            throw new Error(ErrorMessages.INVALID_KEY);
        }
    }
}
