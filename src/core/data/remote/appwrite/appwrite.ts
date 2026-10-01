import { Account, Client, Databases, TablesDB } from "react-native-appwrite";
import { Platform } from "react-native";

export const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ?? "",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID ?? "",
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID ?? "",
  collectionId: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID ?? "",
  notesTableId: process.env.EXPO_PUBLIC_APPWRITE_DB_TABLE_NOTES_ID ?? "",
};

export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ?? "")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID ?? "");

switch (Platform.OS) {
  case "ios":
    client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID ?? "");
    break;
  case "android":
    client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME ?? "");
    break;
}

export const database = new TablesDB(client);
export const account = new Account(client);


