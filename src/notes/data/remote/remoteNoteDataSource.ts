import { config } from "@/src/core/data/remote/appwrite/appwrite";
import { AppwriteDatabase } from "@/src/core/data/remote/appwrite/appwriteDb";
import { NoteDto } from "@/src/notes/data/remote/noteDto";
import { Note } from "../../domain/note";
import { NotesDataSource } from "../../domain/notesDataSource";

export class RemoteNoteDataSource implements NotesDataSource {
  constructor(private appWriteDb: AppwriteDatabase) {}

  async getMyNotes(userId: string): Promise<Note[]> {
    try {
      const response = (await this.appWriteDb.getTable({
        dbId: config.databaseId,
        tableId: config.notesTableId,
        userId: userId,
      })) as NoteDto[];

      return response.map((note: NoteDto) => ({
        id: note.$id,
        userId: note.userId,
        content: note.content,
        createdDate: note.createdDate,
        lastUpdatedDate: note.lastUpdatedDate,
        isArchived: note.isArchived,
      }));
    } catch (error) {
      console.error("Error getting notes:", error);
      throw error;
    }
  }
  async addNote(note: Note): Promise<Note> {
    try {
      const databaseRowId = await this.appWriteDb.addRow<Note>({
        dbId: config.databaseId,
        tableId: config.notesTableId,
        data: note,
      });

      note.id = databaseRowId;
      return note;
    } catch (error) {
      console.error("Error adding note:", error);
      throw error;
    }
  }
  async updateNote(id: string, newContent: string): Promise<void> {
    try {
      await this.appWriteDb.updateRow<Object>({
        dbId: config.databaseId,
        tableId: config.notesTableId,
        rowId: id,
        data: { content: newContent, lastUpdatedDate: new Date() },
      });
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  }

  async deleteNote(noteId: string): Promise<void> {
    try {
      await this.appWriteDb.deleteRow({
        dbId: config.databaseId,
        tableId: config.notesTableId,
        rowId: noteId,
      });
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  }
  archiveNote(noteId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
