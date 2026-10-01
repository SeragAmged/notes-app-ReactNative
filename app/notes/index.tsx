import { useAuthContext } from "@/src/auth/authContext";
import { AppwriteDatabase } from "@/src/core/data/remote/appwrite/appwriteDb";
import { NotesRepo } from "@/src/notes/data/notesRepo";
import { RemoteNoteDataSource } from "@/src/notes/data/remote/remoteNoteDataSource";
import { Note } from "@/src/notes/domain/note";
import AddNoteModal from "@/src/notes/presentation/components/AddNoteModal";
import NotesList from "@/src/notes/presentation/components/NotesList";
import { router } from "expo-router";
import * as React from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const NotesScreen = () => {
  const repo: NotesRepo = new NotesRepo(
    new RemoteNoteDataSource(new AppwriteDatabase())
  );

  const [notes, setNotes] = React.useState<Note[]>([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [newNote, setNewNote] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const { user, loading: userLoading } = useAuthContext();
  React.useEffect(() => {
    if (!userLoading && !user) {
      router.replace("/auth");
    }
  }, [user, userLoading]);

  React.useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const notes = await repo.getMyNotes(user.$id);
      setNotes(notes);
      setError("");
    } catch (error) {
      let message =
        error instanceof Error ? error.message : "Failed to load notes.";

      setError(message);

      Alert.alert("Error", `Failed to load notes.\n${message}`, [
        {
          text: "OK",
          style: "cancel",
          onPress: () => {
            router.replace("/auth");
          },
        },
      ]);

      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async () => {
    if (newNote.trim() === "") return;

    const note: Note = {
      userId: user.$id,
      content: newNote,
      createdDate: new Date(),
      lastUpdatedDate: new Date(),
      isArchived: false,
      id: undefined,
    };
    const newNoteL = await repo.addNote(note);
    note.id = newNoteL.id;
    setNotes((prevNote) => {
      return [...prevNote, note];
    });
  };

  const onDelete = async (noteId: string) => {
    try {
      Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await repo.deleteNote(noteId);
            setNotes((prevNotes) =>
              prevNotes.filter((note) => note.id !== noteId)
            );
          },
        },
      ]);
    } catch (error) {
      console.error("Error deleting note:", error);

      Toast.show({
        type: "error",
        text1: "Failed to delete note ❌",
        text2: "Please try again.",
        position: "bottom",
      });
      fetchNotes();
    }
  };

  const onUpdate = async (id: string, newContent: string) => {
    try {
      await repo.updateNote(id, newContent);
    } catch (error) {
      console.error("Error deleting note:", error);

      Toast.show({
        type: "error",
        text1: "Failed to update note ❌",
        text2: "Please try again.",
        position: "bottom",
      });
      fetchNotes();
    }
  };

  return (
    <>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color="#0000ff"
          />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <NotesList notes={notes} onDelete={onDelete} onUpdate={onUpdate} />
        )}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add Note</Text>
        </TouchableOpacity>

        <AddNoteModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setNewNote={setNewNote}
          newNote={newNote}
          addNote={addNote}
        />
      </View>
      <Toast />
    </>
  );
};

export default NotesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },

  addButton: {
    marginBottom: 48,
    marginTop: 16,

    backgroundColor: "#007bff",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
