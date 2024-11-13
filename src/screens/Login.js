import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ImageBackground,
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
        <Image
          source={require('../../assets/logo_branca.png')} // Substitua com o caminho da sua imagem
          style={styles.overlayImage}
        >
      </Image>

      {/* Formulário de login */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>

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

        <Text style={styles.Text}>Não tem uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.linkText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DB914A", // Cor de fundo verde para a tela inteira
    justifyContent: "flex-start", // Garantir que o conteúdo comece do topo
  },
  overlayImage: {
    width: 200, // Ajuste o tamanho da imagem conforme necessário
    height: 200,
    position: "center", // A imagem vai ser posicionada sobre o conteúdo
    top: 100, // Ajuste a posição vertical para centralizar um pouco mais
    left: "46%", // Posiciona a imagem no meio da tela horizontalmente
    transform: [{ translateX: -75 }], // Move a imagem para a esquerda para centralizar (metade da largura da imagem)
    zIndex: 1, // A imagem fica acima do conteúdo
    resizeMode: 'contain', // A imagem vai se ajustar dentro do espaço disponível sem distorcer
  },
  
  formContainer: {
    flex: 1, // Permite que o formulário ocupe a parte restante da tela
    marginTop: 200, // Deixa o formulário começar após o banner (ajuste conforme necessário)
    width: "100%", // O formulário vai ocupar 100% da largura da tela
    backgroundColor: "#fff",  // Cor de fundo branco para o formulário
    borderTopRightRadius: 110,  // Arredondamento no canto superior direito
    padding: 50,  // Adiciona espaçamento interno
    shadowColor: "#000",  // Adiciona uma sombra
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,  // Sombra para Android
    zIndex: 1, // Garante que o formulário fique acima do banner
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: 'center',  // Centraliza o título
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
    backgroundColor: "#61B375", // Cor do botão
    paddingVertical: 10, // Espaçamento vertical para o botão
    paddingHorizontal: 40, // Menos espaçamento horizontal, deixando o botão mais estreito
    borderRadius: 8,
    marginTop: 20,
    marginHorizontal: 50,
    alignItems: "center", // Centraliza o texto no botão
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff", // Cor do texto do botão
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    color: "#DB914A",
    marginTop: 16,
    textAlign: "center",  // Centraliza o texto
    fontWeight: "bold",
    top: -35, // Ajuste a posição vertical para centralizar um pouco mais
    left: 70,
  },
  Text: {
    color: "#000",
    marginTop: 16,
    textAlign: "center",  // Centraliza o texto
    fontWeight: "bold",
    left: -40,
  },
});

export default Login;
