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

const Signup = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (nome && email && password && confirmPassword) {
      if (password === confirmPassword) {
        setLoading(true);
        const response = await registerUser(nome, email, password);
        setLoading(false);

        if (response.success) {
          Alert.alert("Cadastro realizado com sucesso", "Agora você pode fazer login.");
          navigation.navigate("Login");
        } else {
          Alert.alert("Falha no cadastro", response.message);
        }
      } else {
        Alert.alert("Erro", "As senhas não coincidem.");
      }
    } else {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Imagem sobre o banner */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/LogoEsuda.png')} // Substitua com o caminho da sua imagem
          style={styles.overlayImage}
        />
      </View>

      {/* Formulário de cadastro */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Criar Conta</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
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

        {/* Botão de cadastro */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignup}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? "Carregando..." : "Cadastrar"}</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#1e90ff" />}

        {/* Link para redirecionar para a tela de login */}
        <View style={styles.loginLinkContainer}>
          <Text style={styles.Text}>Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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
    backgroundColor: "#DB914A", // Cor de fundo
    justifyContent: "flex-start", // Começar o conteúdo do topo
  },
  logoContainer: {
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
    borderRadius: 8,
    backgroundColor: "#fff",
    color: "#808080",
  },
  button: {
    backgroundColor: "#61B375",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
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
    flexDirection: 'row', // Alinha os itens horizontalmente
    justifyContent: 'center', // Centraliza o conteúdo horizontalmente
    marginTop: 16,
  },
  linkText: {
    color: "#DB914A", // Cor do texto "Faça login"
    fontWeight: "bold",
  },
  Text: {
    color: "#000", // Cor do texto "Já tem uma conta?"
    fontWeight: "bold",
  },
});

export default Signup;
