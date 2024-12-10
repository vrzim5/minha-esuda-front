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

// Componente DocumentDetails que exibe os detalhes de um documento
const DocumentDetails = ({ route, navigation }) => {
  // Obtém os parâmetros da rota
  const { item } = route.params;

  // Hook para obter as dimensões da janela
  const { width, height } = useWindowDimensions();
  // Verifica se a orientação é paisagem
  const isLandscape = width > height;

  const [modalVisible, setModalVisible] = useState(false);

  // Função para lidar com a exclusão do documento
  const handleDelete = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      user.documents = user.documents.filter(
        (doc) => doc._id !== item._id
      );
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setModalVisible(false);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Falha ao remover documento:", error);
    }
  };

  // Retorna a interface da tela de detalhes do documento
  return (
    <View style={styles.container}>
      {/* Cabeçalho com botão de voltar */}
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

      {/* Título da tela */}
      <Text
        style={[styles.title, isLandscape && styles.titleLandscape]}
        accessible={true}
        accessibilityRole="header"
        accessibilityLabel="Detalhes do documento"
      >
        Detalhes do documento
      </Text>

      {/* Verifica se o item existe e exibe os detalhes do documento */}
      {item && (
        <View
          style={[
            styles.cardContainer,
            isLandscape && styles.cardContainerLandscape,
          ]}
        >
          {/* Componente DocumentCard para exibir as informações do documento */}
          <DocumentCard
            {...item}
            accessible={true}
            accessibilityLabel="Informações do documento estudantil"
            accessibilityHint="Mostra as informações detalhadas do documento"
          />
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.deleteButton,
          isLandscape && styles.deleteButtonLandscape,
        ]}
        onPress={() => setModalVisible(true)}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Deletar documento"
        accessibilityHint="Toque uma vez para deletar o documento"
      >
        <FontAwesome name="trash" size={24} color="white" />
      </TouchableOpacity>
      {/* Componente DeletePopups para exibir o modal de confirmação de exclusão */}
      <DeletePopups
        visible={modalVisible}
        onDelete={handleDelete}
        onCancel={() => setModalVisible(false)}
      />
    </View>
  );
};

// Estilos do componente
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
    marginBottom: -10,
    marginTop: 10,
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
    paddingHorizontal: 70,
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
