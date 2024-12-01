import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const GetStarted = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Título */}
      <View style={styles.titleContainer} accessible={true} accessibilityRole="header">
        <Text style={styles.title} accessibilityLabel="Bem-vindo(a)">Bem-vindo(a)</Text>
        <Text style={styles.title} accessibilityLabel="ao Minha Esuda">ao Minha Esuda</Text>
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
        onPress={() => navigation.navigate("Login")}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Começar"
        accessibilityHint="Toque uma vez para ir para a tela de cadastro"
      >
        <Text style={styles.buttonText}>Começar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#DB914A", // Cor de fundo laranja
  },
  titleContainer: {
    width: "100%",
    alignItems: "flex-start", // Alinha o texto à esquerda
    marginTop: "30%",
    marginBottom: -80,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "left", // Título alinhado à esquerda
  },
  image: {
    width: 500, // Ajuste o tamanho da imagem conforme necessário
    height: 500,
    resizeMode: "contain",
    marginBottom: -120,
  },
  subtitle: {
    fontSize: 20,
    color: "#fff", // Cor branca para o texto abaixo da imagem
    textAlign: "center", // Texto centralizado
    marginBottom: 90,
  },
  button: {
    backgroundColor: "#61B375", // Cor do botão
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default GetStarted;
