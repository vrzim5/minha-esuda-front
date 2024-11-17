import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../services/api";

// Função para validar e-mail com o domínio específico @esuda.edu.br
const isValidEmail = (email) => {
  const regex = /\S+@\S+\.\S+/; // Verifica se o e-mail tem formato válido
  if (!regex.test(email)) {
    return false; // Se não for um e-mail válido, retorna false
  }

  // Verifica se o e-mail termina com @esuda.edu.br
  return email.endsWith("@esuda.edu.br");
};

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Por favor, preencha o e-mail e a senha.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Erro", "O e-mail utilizado não é um e-mail institucional Esuda.");
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser(email, senha);

      if (response.success) {
        // Armazenar o token JWT no AsyncStorage
        await AsyncStorage.setItem("token", response.data.token);
        navigation.replace("Home");
      } else {
        Alert.alert("Falha no Login", response.message);
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao tentar fazer login. Tente novamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Imagem sobre o banner */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/LogoEsuda.png')} // Substitua com o caminho da sua imagem
          style={styles.overlayImage}
        />
      </View>

      {/* Formulário de login */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Logar</Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: 00000000@esuda.edu.br"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        {/* Botão personalizado */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? "Carregando..." : "Entrar"}</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#1e90ff" />}

        {/* Mensagem "Não tem uma conta? Cadastre-se" lado a lado */}
        <View style={styles.signupContainer}>
          <Text style={styles.Text}>Não tem uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.linkText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { // Background
    flex: 1,
    backgroundColor: "#DB914A", // Cor de fundo
    justifyContent: "flex-start", // Começar o conteúdo do topo
  },
  logoContainer: { // Container para o Logo Esuda - Serve para deixar a logo no meio sem interferir em outros elementos
    flex: 1,  // Faz com que a logo ocupe o espaço disponível
    justifyContent: "center",  // Alinha verticalmente ao centro
    alignItems: "center",  // Alinha horizontalmente ao centro
    position: 'relative',
  },
  overlayImage: {
    marginTop: "10%",
    width: 200, // Ajuste o tamanho da imagem conforme necessário
    height: 200,
    resizeMode: 'contain', // A imagem vai se ajustar dentro do espaço disponível sem distorcer
  },
  formContainer: {
    flex: 2, // Permite que o formulário ocupe o restante do espaço
    marginTop: -50,  // Ajusta a posição do formulário para um alinhamento mais adequado
    width: "100%",
    top: 99,
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
    elevation: 5, // Sombra para Android
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: 'center',
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Container para a mensagem "Não tem uma conta? Cadastre-se"
  signupContainer: {
    flexDirection: 'row',  // Organiza os textos lado a lado
    justifyContent: 'center', // Centraliza horizontalmente os textos
    marginTop: 16,
  },
  linkText: {
    color: "#DB914A", // Cor do texto "Cadastre-se"
    fontWeight: "bold",
  },
  Text: {
    color: "#000", // Cor do texto "Não tem uma conta?"
    fontWeight: "bold",
  },
});

export default Login;
