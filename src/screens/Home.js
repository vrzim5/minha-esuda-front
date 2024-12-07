import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Card from "../components/Card";
import { logoutUser } from "../services/api";
import { useFocusEffect } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  
  const [documents, setDocuments] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchDocuments = async () => {
        const documents = await AsyncStorage.getItem("documents");
        if (documents) {
          setDocuments(JSON.parse(documents));
        }
      };
      fetchDocuments();
      return () => {};
    }, [])
  );

  const handleLogout = async () => {
    await logoutUser();
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, isLandscape && styles.headerLandscape]}>
        <TouchableOpacity 
        style={[styles.logoutButton, isLandscape && styles.logoutButtonLandscape]} 
        onPress={handleLogout}
        >
        <FontAwesome 
        name="sign-out" 
        size={24} 
        color="white" 
        style={styles.icon}
        accessible={true}
        accessibilityRole="button"
        accessibilityHint="Toque uma vez para sair da sua conta"
        />
      </TouchableOpacity>

      </View>
      <Text style={[styles.title, isLandscape && styles.titleLandscape]}
      accessible={true} 
      accessibilityRole="header" 
      accessibilityLabel="Seus Documentos">
        Seus Documentos
      </Text>

      {documents.length === 0 ? (
        <View style={styles.placeholder}>
          <Ionicons
            name="id-card"
            size={150}
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
              <Card {...item} isLandscape={isLandscape} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item._id}
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
    backgroundColor: "white",
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
  logoutButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 5,
  },
  logoutButtonLandscape: {
    top: "50%",
    transform: [{ translateY: -15 }],
  },
  icon: {
    transform: [{ rotate: "180deg" }], 
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginVertical: 30,
  },
  titleLandscape: {
    fontSize: 24,
    marginTop: 15,
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
