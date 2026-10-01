export type NoteDto = {
  $id: string;
  userId: string;
  content: string;
  createdDate: Date;
  lastUpdatedDate: Date;
  isArchived: boolean;
};
