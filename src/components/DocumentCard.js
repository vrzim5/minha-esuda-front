import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import QRCode from "react-native-qrcode-svg";

import dneImg from "../assets/dne.png";
import yearImg from "../assets/2025.png";
import uneImg from "../assets/une.png";

const DocumentCard = ({
  name,
  cpf,
  birthDate,
  institution,
  course,
  issuer,
  _id,
  validity,
}) => {
  const formatDate = (date) => {
    const d = new Date(date);
    const day = `0${d.getDate()}`.slice(-2);
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.card}>
      <Image source={dneImg} style={styles.dneImage} resizeMode="contain" />
      <Image source={uneImg} style={styles.uneImage} resizeMode="contain" />
      <View style={styles.infoContainer}>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Nome: </Text>
          {name}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>CPF: </Text>
          {cpf}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Data de Nascimento: </Text>
          {formatDate(birthDate)}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Instituição: </Text>
          {institution}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Curso: </Text>
          {course}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Emissor: </Text>
          {issuer}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>ID: </Text>
          {_id}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Válido até: </Text>
          {formatDate(validity)}
        </Text>
      </View>
      <Image source={yearImg} style={styles.yearImage} resizeMode="contain"/>
      <View style={styles.qrCodeContainer}>
        <QRCode value={_id} size={100} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    margin: 25,
    backgroundColor: "#60B275",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    position: "relative",
    height: 500,
  },
  dneImage: {
    width: 130,
    height: 50,
    position: "absolute",
    top: 15,
    left: 20,
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
    bottom: 50,
    left: 20,
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
    top: 80,
    right: 20,
  },
});

export default DocumentCard;
