import { Note } from "../domain/note";

export type NotesState = {
  notes: Note[];
  isLoading: boolean;
  error: string | null;
  isModalVisible: boolean;
};
