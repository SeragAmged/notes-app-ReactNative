import { Note } from "./note";

interface NotesDataSource {
  getMyNotes(userId: string): Promise<Note[]>;
  addNote(note: Note): Promise<Note>;
  updateNote(id: string, newContent: string): Promise<void>;
  deleteNote(noteId: string): Promise<void>;
  archiveNote(noteId: string): Promise<void>;
}
export { NotesDataSource };
