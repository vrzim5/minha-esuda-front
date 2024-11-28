import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

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
      <View style={styles.qrCodeContainer}>
        <QRCode value={_id} size={120} />
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
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  boldText: {
    fontWeight: "bold",
  },
  qrCodeContainer: {
    alignItems: "center",
    marginTop: 10,
  },
});

export default DocumentCard;
