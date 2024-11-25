import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const AddDocument = ({ route, navigation }) => {
  const { data } = route.params;

  // Parse data to extract document info
  const documentInfo = {
    // Extracted fields
  };

  const handleAdd = () => {
    // Add document to state/storage
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} accessible={true} accessibilityRole="header" accessibilityLabel="Adicionar documento">Adicionar documento</Text>
      <Text
        style={styles.text}
        accessible={true}
        accessibilityLabel="Verifique se as informações do seu documento estão corretas"
      >
        Verifique se as informações do seu documento estão corretas
      </Text>

      {/* Card com as informações do documento */}
      <View style={styles.card} accessible={true} accessibilityRole="summary">
        <Text style={styles.cardTitle} accessible={true} accessibilityLabel="Carteira de Estudante">
          Carteira de Estudante
        </Text>
        <Text style={styles.cardText} accessible={true} accessibilityLabel={`Nome: ${documentInfo.name}`}>
          Nome: {documentInfo.name}
        </Text>
        <Text style={styles.cardText} accessible={true} accessibilityLabel={`CPF: ${documentInfo.cpf}`}>
          CPF: {documentInfo.cpf}
        </Text>
        <Text style={styles.cardText} accessible={true} accessibilityLabel={`Nascimento: ${documentInfo.birthDate}`}>
          Nasc: {documentInfo.birthDate}
        </Text>
        <Text style={styles.cardText} accessible={true} accessibilityLabel={`Instituição: ${documentInfo.institution}`}>
          Inst: {documentInfo.institution}
        </Text>
        <Text style={styles.cardText} accessible={true} accessibilityLabel={`Curso: ${documentInfo.course}`}>
          Curso: {documentInfo.course}
        </Text>
        <Text style={styles.cardText} accessible={true} accessibilityLabel={`Emissor: ${documentInfo.issuer}`}>
          Emissor: {documentInfo.issuer}
        </Text>
        <Text style={styles.cardText} accessible={true} accessibilityLabel={`Validade: ${documentInfo.validity}`}>
          Válido até: {documentInfo.validity}
        </Text>
      </View>

      <TouchableOpacity 
      style={styles.addButton} 
      onPress={handleAdd}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Adicionar"
      accessibilityHint="Toque uma vez para adicionar o documento"
    >
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.navigate("Home")}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Cancelar"
        accessibilityHint="Toque uma vez para cancelar"
      >        
        <Text>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
  },
});
export default AddDocument;