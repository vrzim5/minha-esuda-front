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

// Função para validar e-mail 
const isValidEmail = (email) => {
  const regex = /\S+@\S+\.\S+/; 
  if (!regex.test(email)) {
    return false; 
  }
  return email.endsWith("@esuda.edu.br");
};

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha o e-mail e a senha.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Erro", "O e-mail utilizado não é um e-mail institucional Esuda.");
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser(email, password);

      if (response.success) {

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
      {/* Imagem*/}
      <View style={styles.logoContainer} accessible={true} accessibilityRole="image">
        <Image
          source={require('../assets/LogoEsuda.png')} 
          style={styles.overlayImage}
          accessible={true}
          accessibilityLabel="Logo da Esuda"
        />
      </View>

      {/* Formulário de login */}
      <View style={styles.formContainer}>
        <Text style={styles.title} accessible={true} accessibilityRole="header">Logar</Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: 00000000@esuda.edu.br"
          value={email}
          onChangeText={setEmail}
          accessible={true}
          accessibilityLabel="Email"
          accessibilityHint="Digite seu e-mail institucional"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          accessible={true}
          accessibilityLabel="Senha"
          accessibilityHint="Digite sua senha"
        />

        {/* Botão */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Entrar"
          accessibilityHint="Toque uma vez para fazer login"
        >
          <Text style={styles.buttonText}>{loading ? "Carregando..." : "Entrar"}</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#1e90ff" />}

        {/* Link para redirecionar para a tela de cadastro */}
        <View style={styles.signupContainer}>
          <Text style={styles.Text} accessible={true} accessibilityLabel="Não tem uma conta?">Não tem uma conta? </Text>
          <TouchableOpacity
          onPress={() => navigation.navigate("Signup")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Cadastrar-se"
          accessibilityHint="Toque uma vez para ir para a tela de cadastro"
        >
          <Text style={styles.linkText}>Cadastrar-se</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
    position: 'relative',
  },
  overlayImage: {
    marginTop: "10%",
    width: 200, 
    height: 200,
    resizeMode: 'contain', 
  },
  formContainer: {
    flex: 2, 
    marginTop: -50,  
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
    elevation: 5,
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
  signupContainer: {
    flexDirection: 'row',  
    justifyContent: 'center', 
    marginTop: 16,
  },
  linkText: {
    color: "#DB914A", 
    fontWeight: "bold",
  },
  Text: {
    color: "#000", 
    fontWeight: "bold",
  },
});

export default Login;
