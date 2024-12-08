import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import { getProfilePicture } from "../services/api";
import { formatDate } from "../utils/date";

// Componente Card que exibe informações de perfil
const Card = ({ profilePicture, name, _id, validity }) => {
  // Hook para obter as dimensões da janela
  const { width, height } = useWindowDimensions();
  // Verifica se a orientação é paisagem
  const isLandscape = width > height;

  // Imagem de fundo do cartão
  const backgroundImage = require("../assets/background1.png");

  // Retorna o componente Card
  return (
    // Componente backgroundImage para definir a imagem de fundo do cartão
    <ImageBackground
      source={backgroundImage}
      style={[styles.card, isLandscape && styles.cardLandscape]}
      imageStyle={styles.backgroundImage}
    >
      {/* Container para a imagem de perfil */}
      <View style={styles.profilePictureContainer}>
        {/* Componente Image para exibir a imagem de perfil */}
        <Image
          source={getProfilePicture(profilePicture)}
          style={styles.profilePicture}
        />
      </View>
      {/* Exibe o nome do usuário */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{name}</Text>
        {/* Exibe a Id da carteirinha */}
        <Text style={styles.content}>ID: {_id}</Text>
        {/* Exibe a validade formatada */}
        <Text style={styles.content}>Válido até {formatDate(validity)}</Text>
      </View>
    </ImageBackground>
  );
};

// Estilos do componente Card
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#58f67a",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
  },
  backgroundImage: {
    resizeMode: "cover",
  },
  infoContainer: {
    alignItems: "left",
    marginLeft: 20,
  },
  cardLandscape: {
    alignSelf: "center",
    width: "60%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: "#333",
  },
  profilePictureContainer: {
    alignItems: "left",
    marginTop: 5,
    marginRight: 5,
  },
  profilePicture: {
    width: 60,
    height: 70,
    borderRadius: 5,
    marginBottom: 5,
    alignItems: "left",
  },
});

export default Card;
