import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DocumentCard from "../components/DocumentCard";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import DeletePopups from "../components/DeletePopups";

const DocumentDetails = ({ route, navigation }) => {
  const { item } = route.params;
  
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

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
      <View style={[styles.header, isLandscape && styles.headerLandscape]}>
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
        style={[styles.title, isLandscape && styles.titleLandscape]}
        accessible={true}
        accessibilityRole="header"
        accessibilityLabel="Detalhes do documento"
      >
        Detalhes do documento
      </Text>

      {item && (
        <View
          style={[
            styles.cardContainer,
            isLandscape && styles.cardContainerLandscape,
          ]}
        >
          <DocumentCard
            {...item}
            accessible={true}
            accessibilityLabel="Informações do documento"
            accessibilityHint="Mostra as informações detalhadas do documento"
          />
        </View>
      )}

      <TouchableOpacity
        style={[ styles.deleteButton, isLandscape && styles.deleteButtonLandscape,]}
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
  headerLandscape: {
    height: 60,
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
  titleLandscape: {
    fontSize: 20,
    marginBottom: 0,
    marginTop: 15,
  },
  cardContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  cardContainerLandscape: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 80,
    marginBottom: 10,
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
  deleteButtonLandscape: {
    top: 10,
    right: 50,
    padding: 12,
  },
});

export default DocumentDetails;
