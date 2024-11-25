import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { CameraView, Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CAMERA_SIZE = width * 0.7;

const Scan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    navigation.navigate("AddDocument", { data });
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão da câmera...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera.</Text>;
  }

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

      <Text style={styles.title} accessible={true} accessibilityRole="header">Escaneie o seu documento</Text>
      <Text 
        style={styles.description}
        accessible={true}
        accessibilityLabel="Escaneie o QR code presente no seu documento físico"
      >
        Escaneie o QR code presente no seu documento
      </Text>
      <View style={styles.scannerContainer}>
        <View style={styles.cameraContainer}>
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
            }}
            style={styles.camera}
            ratio="1:1"
            accessible={true}
            accessibilityLabel="Visualização da câmera para escanear QR code"
          />
        </View>
        {scanned && (
          <Button
            title={"Toque para escanear novamente"}
            onPress={() => setScanned(false)}
          />
        )}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Cancelar"
          accessibilityHint="Toque uma vez para cancelar o escaneamento"
        >
          <Ionicons name="close-circle" size={60} color="#DB914A" />
        </TouchableOpacity>
      </View>
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
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#DB914A",
    marginBottom: 24,
  },
  scanner: {
    width: "100%",
    height: "70%",
  },
  cancelButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  scannerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    width: CAMERA_SIZE,
    height: CAMERA_SIZE,
    overflow: "hidden",
    borderRadius: 10,
  },
  camera: {
    flex: 1,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Scan;
