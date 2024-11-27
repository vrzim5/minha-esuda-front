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
import { registerUser } from "../services/api";

// Função para validar e-mail institucional @esuda.edu.br
const isValidEmail = (email) => {
  return email.endsWith("@esuda.edu.br");
};

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

    // Verifica se o e-mail é um e-mail institucional Esuda
    if (!isValidEmail(email)) {
      Alert.alert("Erro", "Esse e-mail não é um e-mail institucional Esuda.");
      return;
    }

    // Verifica se a senha tem pelo menos 8 caracteres
    if (password.length < 8) {
      Alert.alert("Erro", "A senha deve conter pelo menos 8 caracteres.");
      return;
    }

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      // Chama o serviço de cadastro com o e-mail e senha
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
      {/* Imagem */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/LogoEsuda.png')}
          style={styles.overlayImage}
        />
      </View>

      {/* Formulário de cadastro */}
      <View style={styles.formContainer}>
        <Text style={styles.title} accessible={true} accessibilityRole="header">Cadastrar</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          accessible={true}
          accessibilityLabel="Nome"
          accessibilityHint="Digite seu nome completo"
        />
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
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          accessible={true}
          accessibilityLabel="Confirmar Senha"
          accessibilityHint="Digite sua senha novamente"
        />

        {/* Botão de cadastro */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignup}
          disabled={loading}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Cadastrar"
          accessibilityHint="Toque duas vezes para se cadastrar"
        >
          <Text style={styles.buttonText}>{loading ? "Carregando..." : "Cadastrar"}</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#1e90ff" />}

        {/* Link para redirecionar para a tela de login */}
        <View style={styles.loginLinkContainer}>
          <Text style={styles.Text} accessible={true} accessibilityLabel="Já tem uma conta?">Já tem uma conta? </Text>
          <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Logar-se"
          accessibilityHint="Toque uma vez para ir para a tela de login"
        >
          <Text style={styles.linkText}>Logar-se</Text>
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
  loginLinkContainer: {
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

export default Signup;
