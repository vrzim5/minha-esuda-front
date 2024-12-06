import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  useWindowDimensions,
} from "react-native";

const DeletePopups = ({ visible, onDelete, onCancel }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <Modal 
    transparent={true} 
    visible={visible} 
    animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={[ styles.modalContent, isLandscape && styles.modalContentLandscape,]}>
          <Text style={[styles.modalText, isLandscape && styles.modalTextLandscape]}>
            Tem certeza que deseja deletar este documento?
          </Text>
          <TouchableOpacity
            style={[ styles.confirmDeleteButton, isLandscape && styles.confirmDeleteButtonLandscape,]}
            onPress={onDelete}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Confirmar exclusão"
            accessibilityHint="Toque uma vez para confirmar a exclusão do documento"
          >
            <Text style={styles.buttonText}>Deletar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[ styles.cancelDeleteButton, isLandscape && styles.cancelDeleteButtonLandscape,]}
            onPress={onCancel}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Cancelar exclusão"
            accessibilityHint="Toque uma vez para cancelar a exclusão do documento"
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalContentLandscape: {
    width: 500,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalTextLandscape: {
    fontSize: 16,
  },
  confirmDeleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: "50%",
    alignItems: "center",
  },
  confirmDeleteButtonLandscape: {
    padding: 8,
  },
  cancelDeleteButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: "50%",
    alignItems: "center",
  },
  cancelDeleteButtonLandscape: {
    padding: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default DeletePopups;
