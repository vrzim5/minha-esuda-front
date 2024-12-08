import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  useWindowDimensions,
} from "react-native";

// Componente DeletePopups que exibe um modal de confirmação de exclusão
const DeletePopups = ({ visible, onDelete, onCancel }) => {
  // Hook para obter as dimensões da janela
  const { width, height } = useWindowDimensions();
  // Verifica se a orientação é paisagem
  const isLandscape = width > height;

  return (
    // Componente Modal para exibir o popup de confirmação
    <Modal transparent={true} visible={visible} animationType="slide">
      {/* Container do modal */}
      <View style={styles.modalContainer}>
        {/* Conteúdo do modal */}
        <View
          style={[
            styles.modalContent,
            isLandscape && styles.modalContentLandscape,
          ]}
        >
          {/* Texto de confirmação */}
          <Text
            style={[styles.modalText, isLandscape && styles.modalTextLandscape]}
          >
            Tem certeza que deseja deletar este documento?
          </Text>
          {/* Botão de confirmação de exclusão */}
          <TouchableOpacity
            style={[
              styles.confirmDeleteButton,
              isLandscape && styles.confirmDeleteButtonLandscape,
            ]}
            onPress={onDelete}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Confirmar exclusão"
            accessibilityHint="Toque uma vez para confirmar a exclusão do documento"
          >
            <Text style={styles.buttonText}>Deletar</Text>
          </TouchableOpacity>
          {/* Botão de cancelamento */}
          <TouchableOpacity
            style={[
              styles.cancelDeleteButton,
              isLandscape && styles.cancelDeleteButtonLandscape,
            ]}
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

// Estilos do componente DeletePopups
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
