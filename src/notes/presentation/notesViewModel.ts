import { NotesRepo } from "../data/notesRepo";
import { Note } from "../domain/note";
import { NotesState } from "./notesState";

export class NoteViewModel {
  constructor(private notesRepo: NotesRepo) {}

  public notesState: NotesState = {
    notes: [],
    isLoading: false,
    error: null,
    isModalVisible: false,
  };

  async fetchNotes() {
    this.notesState.isLoading = true;
    this.notesState.error = null;
    try {
      const notes = await this.notesRepo.getMyNotes();
      this.notesState.notes = notes;
    } catch (error) {
      this.notesState.error = "Failed to load notes.";
      console.error("Error fetching notes:", error);
    } finally {
      this.notesState.isLoading = false;
    }
    return this.notesState;
  }
  async addNote(content: string) {
    if (content.trim() === "") return;

    const note: Note = {
      content: content,
      createdDate: new Date(),
      lastUpdatedDate: new Date(),
      isArchived: false,
      id: "",
    };
    try {
      await this.notesRepo.addNote(note);
      this.notesState.notes.push(note);
    } catch (error) {
      console.error("Error adding note:", error);
      throw error;
    }
    return this.notesState;
  }
}
