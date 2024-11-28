import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DocumentCard from "../components/DocumentCard";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import DeletePopups from "../components/DeletePopups";

const DocumentDetails = ({ route, navigation }) => {
  const { item } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = async () => {
    try {
      const documents = await AsyncStorage.getItem("documents");
      const parsedDocuments = JSON.parse(documents);
      const updatedDocuments = parsedDocuments.filter(
        (doc) => doc._id !== item._id
      );
      await AsyncStorage.setItem("documents", JSON.stringify(updatedDocuments));
      setModalVisible(false);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Falha ao remover documento:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.replace("Home")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          accessibilityHint="Toque uma vez para voltar para a tela inicial"
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text
        style={styles.title}
        accessible={true}
        accessibilityRole="header"
        accessibilityLabel="Detalhes do documento"
      >
        Detalhes do documento
      </Text>

      {item && (
        <DocumentCard 
          {...item} 
          accessible={true}
          accessibilityLabel="Informações do documento"
          accessibilityHint="Mostra as informações detalhadas do documento"
        />
        )}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => setModalVisible(true)}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Deletar documento"
        accessibilityHint="Toque uma vez para deletar o documento"
      >
        <FontAwesome name="trash" size={24} color="white" />
      </TouchableOpacity>
      <DeletePopups
        visible={modalVisible}
        onDelete={handleDelete}
        onCancel={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    height: 100,
    backgroundColor: "#DB914A",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: "60%",
    transform: [{ translateY: -12 }],
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginVertical: 30,
  },
  deleteButton: {
    position: "absolute",
    top: 20,
    top: 50,
    right: 20,
    padding: 10,
    backgroundColor: "red",
    backgroundColor: "transparent",
    borderRadius: 5,
  },
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
  confirmDeleteButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  confirmDeleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default DocumentDetails;
