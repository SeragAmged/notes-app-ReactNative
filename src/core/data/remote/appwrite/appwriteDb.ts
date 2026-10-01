import { ID, Query } from "react-native-appwrite";
import { database } from "./appwrite";

export class AppwriteDatabase {
  async getTable({
    dbId,
    tableId,
    userId,
  }: {
    dbId: string;
    tableId: string;
    userId: string;
  }): Promise<any[]> {
    try {
      const response = await database.listRows({
        databaseId: dbId,
        tableId: tableId,
        queries: [
            Query.equal('userId', userId),
        ],
      });

      return response.rows ?? [];
    } catch (error) {
      console.error("❌ Error fetching table data:", error);
      throw error;
    }
  }
  async addRow<T extends object>({
    dbId,
    tableId,
    data,
  }: {
    dbId: string;
    tableId: string;
    data: T;
  }) {
    try {
      const response = await database.createRow({
        databaseId: dbId,
        tableId: tableId,
        rowId: ID.unique(),
        data: data,
      });
      return response.$id;
    } catch (error) {
      console.error("❌ Error adding row:", error);
      throw error;
    }
  }

  async deleteRow({
    dbId,
    tableId,
    rowId,
  }: {
    dbId: string;
    tableId: string;
    rowId: string;
  }) {
    try {
      await database.deleteRow({
        databaseId: dbId,
        tableId: tableId,
        rowId: rowId,
      });
    } catch (error) {
      console.error(`❌ Error deleting row from row ${rowId}:`, error);
      console.error(`❌ Error deleting row: ${error}`, error);
      throw error;
    }
  }

  async updateRow<T extends object>({
    dbId,
    tableId,
    rowId,
    data,
  }: {
    dbId: string;
    tableId: string;
    rowId: string;
    data: T;
  }) {
    try {
      await database.updateRow({
        databaseId: dbId,
        tableId: tableId,
        rowId: rowId,
        data: data,
      });
    } catch (error) {
      console.error("❌ Error updating row:", error);
      throw error;
    }
  }
}
