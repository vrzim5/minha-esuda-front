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
} from "react-native";
import { registerUser } from "../services/api";

const isValidEmail = (email) => email.endsWith("@esuda.edu.br");

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

    if (!/[!@#$%^&*()\-_=+]/.test(password)) {
      Alert.alert("Erro", "A senha deve conter pelo menos 1 caractere especial.");
      return;
    }

    if (!/[0-9]/.test(password)) {
      Alert.alert("Erro", "A senha deve conter pelo menos 1 caractere numérico.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      Alert.alert("Erro", "A senha deve conter pelo menos 1 caractere maiúsculo.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const response = await registerUser(email, password, name);
      if (response.success) {
        Alert.alert("Cadastro realizado com sucesso", "Agora você pode fazer login.");
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

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/LogoEsuda.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Cadastrar</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Ex: 00000000@esuda.edu.br"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSignup}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Carregando..." : "Cadastrar"}
          </Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#1e90ff" />}

        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginText}>Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLink}>Logar-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DB914A",  // Laranja de fundo
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,   // Espaçamento para não sobrepor a logo
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#fff",    // Cartão branco como antes

    borderTopRightRadius: 50,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40, // Garante que o branco vá até o final da tela
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    backgroundColor: "#f9f9f9",
    color: "#000",
  },
  button: {
    backgroundColor: "#61B375",
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  loginText: {
    color: "#000",
    fontWeight: "bold",
  },
  loginLink: {
    color: "#DB914A",
    fontWeight: "bold",
  },
});

export default Signup;
