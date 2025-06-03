import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, Platform, KeyboardAvoidingView, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

// Função utilitária para ajustar tamanho conforme largura da tela
const responsiveFontSize = (min, max) => {
  const scaled = width * 0.78;  // 78% da largura da tela
  return Math.min(Math.max(scaled, min), max);
};

const GetStarted = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Título */}
          <View style={styles.titleContainer} accessible={true} accessibilityRole="header">
            <Text 
              style={[styles.title, { fontSize: responsiveFontSize(24, 40) }]} 
              accessibilityLabel="Bem-vindo(a)"
            >
              Bem-vindo(a)
            </Text>
            <Text 
              style={[styles.title, { fontSize: responsiveFontSize(24, 40) }]} 
              accessibilityLabel="ao Minha Esuda"
            >
              ao Minha Esuda
            </Text>
          </View>

          {/* Imagem da carteirinha (logo) */}
          <Image
            source={require('../assets/carteirinha.png')}
            style={styles.image}
            accessible={true}
            accessibilityLabel="Imagem de uma carteira estudantil"
          />

          {/* Texto */}
          <Text style={styles.subtitle} accessible={true} accessibilityLabel="Sua carteira estudantil toda digital">
            Sua carteira estudantil toda digital
          </Text>

          {/* Botão Começar */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Signup")}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Começar"
            accessibilityHint="Toque uma vez para ir para a tela de cadastro"
          >
            <Text style={styles.buttonText}>Começar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#DB914A",
  },
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  titleContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  title: {
    fontWeight: "bold",
    color: "#fff",
    textAlign: "left",
  },
  image: {
    width: "70%",
    maxWidth: 250,
    maxHeight: 250,
    resizeMode: "contain",
    marginVertical: 12,
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginVertical: 12,
    maxWidth: "90%",
    flexShrink: 1,
  },
  button: {
    backgroundColor: "#61B375",
    width: "80%",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GetStarted;
