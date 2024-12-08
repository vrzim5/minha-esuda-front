import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
  useWindowDimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { registerUser } from "../services/api";
import { isValidEmail } from "../utils/date";

// Tela de cadastro
const Signup = ({ navigation }) => {
  // Hook para obter as dimensões da janela
  const { width, height } = useWindowDimensions();
  // Verifica se a orientação é paisagem
  const isLandscape = width > height;

  // Estados para os campos do formulário e para o carregamento
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Função para lidar com o cadastro do usuário
  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Erro", "Esse e-mail não é um e-mail institucional Esuda.");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Erro", "A senha deve conter pelo menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    // Realiza o cadastro do usuário
    setLoading(true);
    try {
      const normalizedEmail = email.toLowerCase();
      const response = await registerUser(normalizedEmail, password, name);
      if (response.success) {
        Alert.alert(
          "Cadastro realizado com sucesso",
          "Agora você pode fazer login."
        );
        navigation.navigate("Login");
      } else {
        Alert.alert("Falha no cadastro", response.message);
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao tentar realizar o cadastro.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Retorna a interface da tela de cadastro
  return (
    // Componente TouchableWithoutFeedback para fechar o teclado ao clicar fora
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* Container principal */}
      <View style={styles.container}>
        {!isLandscape && (
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/LogoEsuda.png")}
              style={styles.overlayImage}
              accessible={true}
              accessibilityLabel="Imagem da Logo da Esuda"
            />
          </View>
        )}
        {/* Container do formulário */}
        <View style={styles.formContainer}>
          <Text
            style={[styles.title, isLandscape && styles.titleLandscape]}
            accessible={true}
            accessibilityRole="header"
          >
            Cadastrar
          </Text>
          <TextInput
            style={[styles.input, isLandscape && styles.inputLandscape]}
            placeholder="Nome"
            value={name}
            onChangeText={setName}
            accessible={true}
            accessibilityLabel="Nome"
            accessibilityHint="Digite seu nome completo"
          />
          <TextInput
            style={[styles.input, isLandscape && styles.inputLandscape]}
            placeholder="Ex: 00000000@esuda.edu.br"
            value={email}
            onChangeText={setEmail}
            accessible={true}
            accessibilityLabel="Email"
            accessibilityHint="Digite seu e-mail institucional"
          />
          <TextInput
            style={[styles.input, isLandscape && styles.inputLandscape]}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            accessible={true}
            accessibilityLabel="Senha"
            accessibilityHint="Digite sua senha"
          />
          <TextInput
            style={[styles.input, isLandscape && styles.inputLandscape]}
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            accessible={true}
            accessibilityLabel="Confirmar Senha"
            accessibilityHint="Digite sua senha novamente"
          />
          <TouchableOpacity
            style={[styles.button, isLandscape && styles.buttonLandscape]}
            onPress={handleSignup}
            disabled={loading}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Cadastrar"
            accessibilityHint="Toque duas vezes para se cadastrar"
          >
            <Text style={styles.buttonText}>
              {loading ? "Carregando..." : "Cadastrar"}
            </Text>
          </TouchableOpacity>
          {/* Exibe o indicador de carregamento */}
          {loading && <ActivityIndicator size="large" color="#1e90ff" />}
          {/* Link para a tela de login */}
          <View
            style={[
              styles.loginLinkContainer,
              isLandscape && styles.loginLinkContainerLandscape,
            ]}
          >
            <Text
              style={styles.Text}
              accessible={true}
              accessibilityLabel="Já tem uma conta?"
            >
              Já tem uma conta?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Logar-se"
              accessibilityHint="Toque uma vez para ir para a tela de login"
            >
              <Text style={styles.linkText}> Logar-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

// Estilos da tela de cadastro
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DB914A",
    justifyContent: "flex-start",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  overlayImage: {
    marginTop: "10%",
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  formContainer: {
    flex: 2,
    marginTop: -50,
    width: "100%",
    top: 75,
    backgroundColor: "#fff",
    borderTopRightRadius: 110,
    padding: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  titleLandscape: {
    fontSize: 25,
    marginTop: -30,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    backgroundColor: "#fff",
    color: "#808080",
  },
  inputLandscape: {
    width: "55%",
    padding: 9,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#61B375",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 15,
    marginTop: 20,
    marginHorizontal: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLandscape: {
    marginTop: 0,
    marginHorizontal: 100,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  loginLinkContainerLandscape: {
    marginTop: 5,
  },
  linkText: {
    color: "#DB914A",
    fontSize: 13,
    fontWeight: "bold",
  },
  Text: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 13,
  },
});

export default Signup;
