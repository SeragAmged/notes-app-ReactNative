export type Note = {
  id: string | undefined;
  userId: string;
  content: string;
  createdDate: Date;
  lastUpdatedDate: Date;
  isArchived: boolean;
};
