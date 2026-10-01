import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import NoteItem from "./NoteItem";
import { Note } from "../../domain/note";

const NotesList = ({
  notes,
  onDelete,
  onUpdate,
}: {
  notes: Note[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, newContent: string) => void;
}) => {
  if (!notes || notes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No notes yet</Text>
        <Text style={styles.emptySubtitle}>
          Tap the + button to create your first note.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={notes}
      keyExtractor={(item: Note) =>
        item.id?.toString() ?? Math.random().toString()
      }
      renderItem={({ item }) => (
        <NoteItem note={item} onDelete={onDelete} onUpdate={onUpdate} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    minHeight: 200,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    color: "#222",
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});

export default NotesList;
