import * as React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AddNoteModal = ({
  modalVisible,
  setModalVisible,
  newNote,
  setNewNote,
  addNote,
}: {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  newNote: string;
  setNewNote: React.Dispatch<React.SetStateAction<string>>;
  addNote: () => void;
}) => {
  const inputRef = React.useRef<TextInput>(null);

  React.useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [modalVisible]);

  return (
    <Modal
      visible={modalVisible}
      transparent
      statusBarTranslucent
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      {/*overlay*/}
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text
            style={styles.modalTitle}
          >Add New Note</Text>
          <TextInput
            ref={inputRef}
            style={styles.noteInput}
            value={newNote}
            onChangeText={setNewNote}
            placeholder="Enter Note ..."
            placeholderTextColor={"rgba(255, 255, 255, 0.43)"}
            
          ></TextInput>
          <View style={styles.modalButtonsRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addNoteButton}
              onPress={() => {
                addNote();
                setNewNote("");
                setModalVisible(false);
              }}
            >
              <Text style={styles.addNoteText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddNoteModal;

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
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
  modalOverlay: {
    backgroundColor: "#00000040",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#242323ff",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    padding: 24,
    borderRadius: 8,
  },
  noteInput: {
    borderColor: "white",
    borderWidth: 1,
    fontSize: 16,
    marginVertical: 8,
    borderRadius: 8,
    width: "100%",
    color: "white",
  },
  modalButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 8,
  },
  cancelButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addNoteButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addNoteText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelText: {
    fontWeight: "bold",
    color: "rgba(51, 51, 51, 0.43)",
  },
});
