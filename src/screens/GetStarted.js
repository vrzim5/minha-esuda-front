import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  useWindowDimensions,
} from "react-native";

const GetStarted = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  return (
    <View style={[styles.container, isLandscape && styles.containerLandscape]}>
      <View
        style={[styles.titleContainer, isLandscape && styles.titleContainerLandscape]}
        accessible={true}
        accessibilityRole="header"
      >
        <Text style={[styles.title, isLandscape && styles.titleLandscape]}
        accessibilityLabel="Bem-vindo(a)">
          Bem-vindo(a) ao Minha Esuda
        </Text>
      </View>

      <Image
        source={require("../assets/carteirinha.png")}
        style={[styles.image, isLandscape && styles.imageLandscape]}
        accessible={true}
        accessibilityLabel="Imagem de uma carteira estudantil"
      />

      <Text
        style={[styles.subtitle, isLandscape && styles.subtitleLandscape]}
        accessible={true}
        accessibilityLabel="Sua carteira estudantil toda digital"
      >
        Sua carteira estudantil toda digital
      </Text>

      <TouchableOpacity
        style={[styles.button, isLandscape && styles.buttonLandscape]}
        onPress={() => navigation.navigate("Login")}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Começar"
        accessibilityHint="Toque uma vez para ir para a tela de cadastro"
      >
        <Text style={[styles.buttonText, isLandscape && styles.buttonTextLandscape]}>Começar</Text>
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
    backgroundColor: "#DB914A", 
  },
  containerLandscape: {
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginTop: "30%",
    marginBottom: -80,
  },
  titleContainerLandscape: {
    width: "100%",
    alignItems: "center",
    marginTop: 0,
    marginBottom: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "left", 
  },
  titleLandscape: {
    fontSize: 30,
    textAlign: "center",
  },
  image: {
    width: 500,
    height: 500,
    resizeMode: "contain",
    marginBottom: -120,
  },
  imageLandscape: {
    width: 400,
    height: 400,
    marginBottom: -100,
    marginTop: -100,
  },
  subtitle: {
    fontSize: 20,
    color: "#fff", 
    textAlign: "center",
    marginBottom: 90,
  },
  subtitleLandscape: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#61B375", 
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 50,
  },
  buttonLandscape: {
    paddingVertical: 8,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonTextLandscape: {
    fontSize: 20,
  },
});

export default GetStarted;
