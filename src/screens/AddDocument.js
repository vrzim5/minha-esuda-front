import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { getDocumentData } from "../services/api";
import DocumentCard from "../components/DocumentCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Componente AddDocument que permite adicionar um novo documento
const AddDocument = ({ route, navigation }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  // Obtém os dados do documento da rota
  const { data } = route.params;

  // Hook para armazenar as informações do documento
  const [documentInfo, setDocumentInfo] = useState(null);

  useEffect(() => {
    const fetchDocumentData = async () => {
      const parsedData = await parseDocumentData(data);
      setDocumentInfo(parsedData);
    };
    fetchDocumentData();
  }, [data]);

  // Função para obter os dados do documento
  const parseDocumentData = async (data) => {
    const documentData = await getDocumentData(data);
    console.log(`${JSON.stringify(documentData)}`);
    return {
      _id: documentData.data._id || "Unknown _id",
      name: documentData.data.name || "Unknown name",
      cpf: documentData.data.cpf || "Unknown cpf",
      birthDate: documentData.data.birthDate || "Unknown date",
      institution: documentData.data.institution || "Unknown institution",
      course: documentData.data.course || "Unknown date",
      issuer: documentData.data.issuer || "Unknown issuer",
      validity: documentData.data.validity || "Unknown date",
      profilePicture: documentData.data.profilePicture || null,
    };
  };

  // Função para lidar com a adição do documento
  const handleAdd = async () => {
    try {
      const documentList =
        JSON.parse(await AsyncStorage.getItem("documents")) || [];
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      if (user.documents.some((doc) => doc._id === documentInfo._id)) {
        console.log("Documento já existe!");
        navigation.navigate("Home");
        return;
      }
      user.documents.push(documentInfo);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error saving document", error);
    }
  };

  // Retorna a interface da tela de adição de documento
  return documentInfo ? (
    <View style={styles.container}>
      {/* Campo de entrada para as informações do documento */}
      <Text
        style={[styles.title, isLandscape && styles.titleLandscape]}
        accessible={true}
        accessibilityRole="header"
        accessibilityLabel="Adicionar documento"
      >
        Adicionar documento
      </Text>

      <Text
        style={[styles.subtitle, isLandscape && styles.subtitleLandscape]}
        accessible={true}
        accessibilityLabel="Verifique se as informações do seu documento estão corretas"
      >
        Verifique se as informações do seu documento estão corretas
      </Text>
      {/* Exibe as informações do documento */}
      {documentInfo && (
        <View style={styles.cardContainer}>
          <DocumentCard
            {...documentInfo}
            accessible={true}
            accessibilityLabel="Informações do documento"
            accessibilityHint="Mostra as informações detalhadas do documento"
          />
        </View>
      )}
      {/* Botões de ação */}
      <View
        style={[
          styles.buttonContainer,
          isLandscape && styles.buttonContainerLandscape,
        ]}
      >
        <TouchableOpacity
          style={[styles.addButton, isLandscape && styles.buttonLandscape]}
          onPress={handleAdd}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Adicionar"
          accessibilityHint="Toque uma vez para adicionar o documento"
        >
          {/* Botão de adicionar documento */}
          <Text
            style={[
              styles.addButtonText,
              isLandscape && styles.buttonSizeLandscape,
            ]}
          >
            Adicionar
          </Text>
        </TouchableOpacity>
        {/* Botão para cancelar a adição do documento */}
        <TouchableOpacity
          style={[styles.cancelButton, isLandscape && styles.buttonLandscape]}
          onPress={() => navigation.navigate("Home")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Cancelar"
          accessibilityHint="Toque uma vez para cancelar"
        >
          <Text
            style={[
              styles.cancelButtonText,
              isLandscape && styles.buttonSizeLandscape,
            ]}
          >
            Cancelar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

// Estilos do componente AddDocument
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  titleLandscape: {
    fontSize: 20,
    marginBottom: -20,
    marginTop: 15,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitleLandscape: {
    display: "none",
  },
  cardContainer: {
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainerLandscape: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonLandscape: {
    marginVertical: 0,
    marginHorizontal: 15,
    marginTop: -25,
  },
  buttonSizeLandscape: {
    fontSize: 14,
  },
});

export default AddDocument;
