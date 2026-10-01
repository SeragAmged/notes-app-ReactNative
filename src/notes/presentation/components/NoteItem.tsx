import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Note } from "../../domain/note";

const NoteItem = ({
  note,
  onDelete,
  onUpdate,
}: {
  note: Note;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newContent: string) => void;
}) => {
  const [newContent, setNewContent] = React.useState(note.content);
  const [isUpdating, setIsUpdating] = React.useState(false);

  const onSave = (id: string, newContent: string) => {
    if (newContent.trim() === note.content) {
      setIsUpdating(false);
      return;
    }
    setIsUpdating(false);
    onUpdate(id, newContent);
  };

  return (
    <View style={styles.noteItem}>
      <TextInput
        style={styles.noteText}
        editable={isUpdating}
        value={newContent}
        onChangeText={setNewContent}
      />
      <View style={{ flexDirection: "row", gap: 12 }}>
        <TouchableOpacity
          onPress={
            isUpdating
              ? () => onSave(note.id ?? "unknown", newContent)
              : () => setIsUpdating(true)
          }
        >
          <Text>{isUpdating ? "💾" : "✏️"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(note.id ?? "unknown")}>
          <Text>❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoteItem;

const styles = StyleSheet.create({
  noteText: {
    fontSize: 18,
    color: "white",
    flex: 1,
    padding: 0,
  },
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    backgroundColor: "#7f7f7fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
});
