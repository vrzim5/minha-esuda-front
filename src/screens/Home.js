import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  const [documents, setDocuments] = useState([]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleLogout}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          accessibilityHint="Toque uma vez para voltar para a tela de login"
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title} accessible={true} accessibilityRole="header" accessibilityLabel="Seus Documentos">Seus Documentos</Text>
      {documents.length === 0 ? (
        <View style={styles.placeholder}>
          <Ionicons
            name="document-text-outline"
            size={100}
            color="#DB914A"
            style={styles.placeholderIcon}
          />
          <Text style={styles.placeholderText}
            accessible={true}
            accessibilityLabel="Nenhum documento foi adicionado ainda"
          >
            Nenhum documento foi adicionado ainda
          </Text>
        </View>
      ) : (
        <FlatList
          data={documents}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("DocumentDetails", { item })} 
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`Documento ${item.name}`}
              accessibilityHint="Toque uma vez para ver os detalhes do documento"
            >
              {/* DocumentCard component */}
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Scan")}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Escanear documento"
        accessibilityHint="Toque uma vez para escanear um novo documento"
      >
        <Ionicons name="add-circle" size={60} color="#DB914A" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginVertical: 24,
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderIcon: {
    opacity: 0.3,
    marginBottom: 20,
  },
  placeholderText: {
    color: "#DB914A",
    fontSize: 16,
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },
});

export default Home;
