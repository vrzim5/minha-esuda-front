import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { CameraView, Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import ManualInputPopup from "../components/ManualInputPopup";

// Largura da janela
const { width } = Dimensions.get("window");
// Tamanho da câmera
const CAMERA_SIZE = width * 0.7;

// Componente Scan que exibe a tela de escaneamento de QR code
const Scan = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [manualInputVisible, setManualInputVisible] = useState(false);

  // Hook para obter as permissões da câmera
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);
  // Função para lidar com o escaneamento do QR code
  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    navigation.navigate("AddDocument", { data });
  };
  // Função para lidar com a submissão manual do código
  const handleManualSubmit = (code) => {
    setManualInputVisible(false);
    navigation.navigate("AddDocument", { data: code });
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão da câmera...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera.</Text>;
  }
  // Tamanho da câmera quando estiver no modo Landscape
  const cameraSize = isLandscape ? width * 0.2 : CAMERA_SIZE;

  // Retorna a interface da tela de escaneamento
  return (
    // Container principal
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
        accessibilityLabel="Escaneie o seu documento"
      >
        Escaneie o seu documento
      </Text>
      {/* Descrição da tela */}
      <Text
        style={[styles.description, isLandscape && styles.descriptionLandscape]}
        accessible={true}
        accessibilityLabel="Escaneie o QR code presente no seu documento físico"
      >
        Escaneie o QR code presente no seu documento
      </Text>
      {/* Container do scanner */}
      <View
        style={[
          styles.scannerContainer,
          isLandscape && styles.scannerContainerLandscape,
        ]}
      >
        <View
          style={[
            styles.cameraContainer,
            { width: cameraSize, height: cameraSize },
          ]}
        >
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
            }}
            style={[styles.camera, isLandscape && styles.cameraLandscape]}
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
        {/* Botão para digitar o código manualmente */}
        <TouchableOpacity
          style={[
            styles.manualInputButton,
            isLandscape && styles.manualInputButtonLandscape,
          ]}
          onPress={() => setManualInputVisible(true)}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Digitar o código"
          accessibilityHint="Toque uma vez para digitar o código manualmente"
        >
          <Text
            style={[
              styles.buttonText,
              isLandscape && styles.buttonTextLandscape,
            ]}
          >
            Digitar o código
          </Text>
        </TouchableOpacity>
        {/* Componente ManualInputPopup para exibir o modal de entrada manual */}
        <ManualInputPopup
          visible={manualInputVisible}
          onSubmit={handleManualSubmit}
          onCancel={() => setManualInputVisible(false)}
        />
        {/* Botão para cancelar o escaneamento */}
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

// Estilos da tela Scan
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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginVertical: 24,
  },
  titleLandscape: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#DB914A",
    marginBottom: 10,
  },
  descriptionLandscape: {
    marginBottom: 5,
    fontSize: 14,
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
  manualInputButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  manualInputButtonLandscape: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonTextLandscape: {
    fontSize: 14,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Scan;
