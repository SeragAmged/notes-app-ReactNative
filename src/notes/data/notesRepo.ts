import { Note } from "../domain/note";
import { NotesDataSource } from "../domain/notesDataSource";

export class NotesRepo implements NotesDataSource {
  constructor(private remoteDataSource: NotesDataSource) {}
  getMyNotes(userId: string): Promise<Note[]> {
    return this.remoteDataSource.getMyNotes(userId);
  }
  addNote(note: Note): Promise<Note> {
    return this.remoteDataSource.addNote(note);
  }
  updateNote(id: string, newContent: string): Promise<void> {
    return this.remoteDataSource.updateNote(id, newContent);
  }
  deleteNote(noteId: string): Promise<void> {
    return this.remoteDataSource.deleteNote(noteId);
  }
  archiveNote(noteId: string): Promise<void> {
    return this.remoteDataSource.archiveNote(noteId);
  }
}
