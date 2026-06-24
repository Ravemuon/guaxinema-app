import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { database } from '../../Config/firebase';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';

function EditGameScreen({ route, navigation }) {
  const { gameId } = route.params;

  const [gameData, setGameData] = useState({
    nome: '',
    descricao: '',
    imagem_url: '',
    genero: '',
    ano: ''
  });

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Carregar os dados do jogo ao montar o componente
  useEffect(() => {
    const gameRef = database.ref(`itens/jogo/${gameId}`);

    gameRef.once('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setGameData({
          nome: data.nome || '',
          descricao: data.descricao || '',
          imagem_url: data.imagem_url || '',
          genero: data.genero || '',
          ano: data.ano || ''
        });
      } else {
        console.log("Nenhum jogo encontrado para esse ID:", gameId);
      }
    });

    return () => {
      gameRef.off();
    };
  }, [gameId]);

  // Função para salvar os dados editados
  const handleSave = () => {
    const gameRef = database.ref(`itens/jogos/${gameId}`);

    gameRef.update({
      nome: gameData.nome,
      descricao: gameData.descricao,
      imagem_url: gameData.imagem_url,
      genero: gameData.genero,
      ano: gameData.ano
    })
      .then(() => {
        setSnackbarMessage('Jogo atualizado com sucesso!');
        setSnackbarVisible(true);
        navigation.goBack();
      })
      .catch((error) => {
        console.log('Erro ao salvar os dados:', error);
        setSnackbarMessage('Erro ao salvar os dados!');
        setSnackbarVisible(true);
      });
  };
  
  // Função para deletar o jogo
  const handleDelete = () => {
    const gameRef = database.ref(`itens/jogos/${gameId}`);

    gameRef.remove()
      .then(() => {
        setSnackbarMessage('Jogo excluído com sucesso!');
        setSnackbarVisible(true);
        navigation.goBack();
      })
      .catch((error) => {
        console.log('Erro ao excluir o jogo:', error);
        setSnackbarMessage('Erro ao excluir o jogo!');
        setSnackbarVisible(true);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar Jogo</Text>

      <TextInput
        mode="outlined"
        label="Nome do Jogo"
        value={gameData.nome}
        onChangeText={(text) => setGameData({ ...gameData, nome: text })}
        style={styles.input}
        theme={{ colors: { primary: '#FF5733' } }}
      />

      <TextInput
        mode="outlined"
        label="Descrição"
        value={gameData.descricao}
        onChangeText={(text) => setGameData({ ...gameData, descricao: text })}
        style={styles.input}
        multiline
        theme={{ colors: { primary: '#FF5733' } }}
      />

      <TextInput
        mode="outlined"
        label="URL da Imagem"
        value={gameData.imagem_url}
        onChangeText={(text) => setGameData({ ...gameData, imagem_url: text })}
        style={styles.input}
        theme={{ colors: { primary: '#FF5733' } }}
      />

      <TextInput
        mode="outlined"
        label="Gênero do Jogo"
        value={gameData.genero}
        onChangeText={(text) => setGameData({ ...gameData, genero: text })}
        style={styles.input}
        theme={{ colors: { primary: '#FF5733' } }}
      />

      <TextInput
        mode="outlined"
        label="Ano de Lançamento"
        value={gameData.ano}
        onChangeText={(text) => setGameData({ ...gameData, ano: text })}
        style={styles.input}
        keyboardType="numeric"
        theme={{ colors: { primary: '#FF5733' } }}
      />

      <Button
        mode="contained"
        onPress={handleSave}
        style={styles.button}
      >
        Salvar
      </Button>

      <Button
        mode="contained"
        onPress={handleDelete}
        style={styles.button}
        color="red"
      >
        Excluir
      </Button>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1A1A1A',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF5733',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginBottom: 15,
  },
});

export default EditGameScreen;
