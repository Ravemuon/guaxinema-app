import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Image source={require('../assets/logo.png')} style={styles.image} />
    <Text style={styles.title}>GUAXINEMA</Text>
    <Text style={styles.subtitle}>FILMES, SÉRIES E JOGOS</Text>
    
    <TextInput
      style={styles.input}
      placeholder="Usuário"
      placeholderTextColor="#666"
    />
    <TextInput
      style={styles.input}
      placeholder="Senha"
      placeholderTextColor="#666"
      secureTextEntry
    />
    
    <TouchableOpacity>
      <Text style={styles.link}>Problemas com login?</Text>
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
      <Text style={styles.buttonText}>ENTRAR</Text>
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
      <Text style={styles.registerText}>Registrar-se</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fundo escuro, remetendo a cinemas antigos
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'PressStart2P', // Fonte retrô SEGA
    color: '#FFC107', // Amarelo vibrante, inspirado no estilo retrô
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'PressStart2P', // Fonte retrô SEGA
    color: '#aaa',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#2E2E2E', // Cinza escuro com toque cinematográfico
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    color: '#fff',
    fontFamily: 'PressStart2P', // Consistência com o tema retrô
  },
  link: {
    color: '#6A4CFF', // (Opcional) você pode ajustar essa cor se desejar remover o tom azul de outros elementos também
    fontFamily: 'PressStart2P',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#8B4513', // Tom terroso, removendo o azul
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginVertical: 20,
    shadowColor: '#000', // Sombra para dar destaque e profundidade
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'PressStart2P',
  },
  registerButton: {
    marginTop: 20,
  },
  registerText: {
    color: '#fff',
    fontFamily: 'PressStart2P',
  },
});

export default LoginScreen;
