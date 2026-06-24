import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth, createUserWithEmailAndPassword } from '../Config/firebase'; // Importe o Firebase
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();
  
  // State para armazenar os valores do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Validação simples
    if (!name || !email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    // Registra o usuário no Firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Usuário registrado com sucesso
        const user = userCredential.user;
        console.log("Usuário registrado:", user);
        Alert.alert("Sucesso", "Usuário registrado com sucesso!");
        navigation.navigate('Login'); // Navega diretamente para a tela de login
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error("Erro ao registrar:", errorMessage);
        Alert.alert("Erro", "Falha ao registrar usuário. Tente novamente.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTRAR-SE</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#666"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
      <Text style={styles.buttonText}>REGISTRAR</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fundo escuro
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'PressStart2P', // Fonte retrô
    color: '#FFC107', // Amarelo vibrante
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#2E2E2E', // Cinza escuro
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    color: '#fff',
    fontFamily: 'PressStart2P', // Consistência com o tema retrô
  },
  button: {
    backgroundColor: '#8B4513', // Cor terrosa
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginVertical: 20,
    shadowColor: '#000', // Sombra para dar destaque
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'PressStart2P', // Fonte retrô
  },
});

export default RegisterScreen;
