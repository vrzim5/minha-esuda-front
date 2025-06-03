import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
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
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async () => {
    setErrorMessage("");  // Limpa mensagens anteriores

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Esse e-mail não é um e-mail institucional Esuda.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("A senha deve conter pelo menos 8 caracteres.");
      return;
    }

    if (password.length > 20) {
      setErrorMessage("A senha deve conter no maximo 20 caracteres.");
      return;
    }

    if (!/[!@#$%^&*()\-_=+]/.test(password)) {
      setErrorMessage("A senha deve conter pelo menos 1 caractere especial.");
      return;
    }

    if (!/[0-9]/.test(password)) {
      setErrorMessage("A senha deve conter pelo menos 1 caractere numérico.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setErrorMessage("A senha deve conter pelo menos 1 caractere maiúsculo.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const response = await registerUser(email, password, name);
      if (response.success) {
        setErrorMessage("Cadastro realizado com sucesso. Agora você pode fazer login.");
        navigation.navigate("Login");
      } else {
        setErrorMessage(response.message || "Falha no cadastro.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Ocorreu um erro ao tentar realizar o cadastro.");
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

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

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
    backgroundColor: "#DB914A",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopRightRadius: 50,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
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
  errorText: {
    color: "red",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Signup;
