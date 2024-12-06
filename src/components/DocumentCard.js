import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  useWindowDimensions,
} from "react-native";

import QRCode from "react-native-qrcode-svg";

import dneImg from "../assets/dne.png";
import yearImg from "../assets/2025.png";
import uneImg from "../assets/une.png";
import { getProfilePicture } from "../services/api";
import { formatDate } from "../utils/date";

const DocumentCard = ({
  name,
  cpf,
  birthDate,
  institution,
  course,
  issuer,
  _id,
  validity,
  profilePicture,
}) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const backgroundImage = isLandscape
    ? require("../assets/background1.png")
    : require("../assets/background2.png");

  return (
    <ImageBackground
      source={backgroundImage}
      style={[styles.card, isLandscape && styles.cardLandscape]}
      imageStyle={styles.backgroundImage}
    >
      <View style={[styles.leftContainer, isLandscape && styles.leftContainerLandscape]}>
        <Image
          source={dneImg}
          style={[styles.dneImage, isLandscape && styles.dneImageLandscape]}
          resizeMode="contain"
        />
        <Image
          source={getProfilePicture(profilePicture)}
          style={[styles.profilePicture, isLandscape && styles.profilePictureLandscape,]}
          accessible={true}
          accessibilityLabel="Foto de perfil"
        />
      </View>

      <Image source={uneImg} style={styles.uneImage} resizeMode="contain" />

      <View
        style={[styles.infoContainer,isLandscape && styles.infoContainerLandscape,]}
        accessible={true}
        accessibilityLabel={`Informações do documento de ${name}`}
      >
        <Text style={styles.text} accessible={true} accessibilityLabel={`Nome: ${name}`}>
          <Text style={styles.boldText}>Nome: </Text>
          {name}
        </Text>
        <Text style={styles.text} accessible={true} accessibilityLabel={`CPF: ${cpf}`}>
          <Text style={styles.boldText}>CPF: </Text>
          {cpf}
        </Text>
        <Text style={styles.text} accessible={true} accessibilityLabel={`Data de Nascimento: ${formatDate(birthDate)}`}>
          <Text style={styles.boldText}>Data de Nascimento: </Text>
          {formatDate(birthDate)}
        </Text>
        <Text style={styles.text} accessible={true} accessibilityLabel={`Instituição: ${institution}`}>
          <Text style={styles.boldText}>Instituição: </Text>
          {institution}
        </Text>
        <Text style={styles.text} accessible={true} accessibilityLabel={`Curso: ${course}`}>
          <Text style={styles.boldText}>Curso: </Text>
          {course}
        </Text>
        <Text style={styles.text} accessible={true} accessibilityLabel={`Emissor: ${issuer}`}>
          <Text style={styles.boldText}>Emissor: </Text>
          {issuer}
        </Text>
        <Text style={styles.text} accessible={true} accessibilityLabel={`ID: ${_id}`}>
          <Text style={styles.boldText}>ID: </Text>
          {_id}
        </Text>
        <Text style={styles.text} accessible={true} accessibilityLabel={`Válido até: ${formatDate(validity)}`}>
          <Text style={styles.boldText}>Válido até: </Text>
          {formatDate(validity)}
        </Text>
      </View>
      <Image source={yearImg} style={styles.yearImage} />
      <View
        style={[styles.qrCodeContainer,isLandscape && styles.qrCodeContainerLandscape,]}
        accessible={true}
        accessibilityLabel="QR Code do documento"
      >
        <QRCode value={_id} size={100} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    margin: 25,
    backgroundColor: "#58f67a",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    position: "relative",
    height: 500,
  },
  cardLandscape: {
    flexDirection: "row",
    height: 250,
    width: "90%",
  },
  backgroundImage: {
    resizeMode: "cover", 
    borderRadius: 10,
  },
  profilePictureContainer: {
    alignItems: "left",
  },
  leftContainerLandscape: {
    alignItems: "left",
    justifyContent: "left",
    marginRight: 20,
    marginLeft: 15,
  },
  dneImage: {
    width: 130,
    height: 50,
    position: "absolute",
    top: -10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  dneImageLandscape: {
    position: "relative",
    top: -10,
    left: 0,
    marginRight: 20,
  },
  profilePicture: {
    width: 125,
    height: 150,
    marginTop: 55,
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  profilePictureLandscape: {
    marginTop: 0,
  },
  uneImage: {
    width: 125,
    height: 45,
    position: "absolute",
    top: 15,
    right: 5,
  },
  yearImage: {
    width: 100,
    height: 50,
    position: "absolute",
    bottom: 15,
    right: 15,
  },
  infoContainer: {
    position: "absolute",
    bottom: 40,
    left: 20,
  },
  infoContainerLandscape: {
    position: "relative",
    bottom: 0,
    left: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  boldText: {
    fontWeight: "bold",
  },
  qrCodeContainer: {
    position: "absolute",
    top: 90,
    right: 20,
  },
  qrCodeContainerLandscape: {
    top: 75,
  },
});

export default DocumentCard;
