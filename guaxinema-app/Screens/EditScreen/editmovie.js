import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { database } from '../../Config/firebase';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';

function EditMovieScreen({ route, navigation }) {
  const { movieId } = route.params;

  const [movieData, setMovieData] = useState({
    nome: '',
    descricao: '',
    imagem_url: '',
    genero: '',
    ano: ''
  });

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Carregar os dados do filme no início
  useEffect(() => {
    const movieRef = database.ref(`itens/filmes/${movieId}`);

    movieRef.once('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMovieData({
          nome: data.nome || '',
          descricao: data.descricao || '',
          imagem_url: data.imagem_url || '',
          genero: data.genero || '',
          ano: data.ano || ''
        });
      } else {
        console.log("Nenhum filme encontrado para esse ID:", movieId);
      }
    });

    return () => {
      movieRef.off();
    };
  }, [movieId]);

  // Função para salvar os dados editados
  const handleSave = () => {
    const movieRef = database.ref(`itens/filmes/${movieId}`);

    movieRef.update({
      nome: movieData.nome,
      descricao: movieData.descricao,
      imagem_url: movieData.imagem_url,
      genero: movieData.genero,
      ano: movieData.ano
    })
    .then(() => {
      setSnackbarMessage('Filme atualizado com sucesso!');
      setSnackbarVisible(true);
      navigation.goBack();
    })
    .catch((error) => {
      console.log('Erro ao salvar os dados:', error);
      setSnackbarMessage('Erro ao salvar os dados!');
      setSnackbarVisible(true);
    });
  };

  // Função para deletar o filme
  const handleDelete = () => {
    const movieRef = database.ref(`itens/filmes/${movieId}`);

    movieRef.remove()
      .then(() => {
        setSnackbarMessage('Filme excluído com sucesso!');
        setSnackbarVisible(true);
        navigation.goBack();
      })
      .catch((error) => {
        console.log('Erro ao excluir o filme:', error);
        setSnackbarMessage('Erro ao excluir o filme!');
        setSnackbarVisible(true);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar Filme</Text>
      
      <TextInput
        mode="outlined"
        label="Nome do Filme"
        value={movieData.nome}
        onChangeText={(text) => setMovieData({ ...movieData, nome: text })}
        style={styles.input}
        theme={{ colors: { primary: '#FF5733' } }}
      />
      
      <TextInput
        mode="outlined"
        label="Descrição"
        value={movieData.descricao}
        onChangeText={(text) => setMovieData({ ...movieData, descricao: text })}
        style={styles.input}
        multiline
        theme={{ colors: { primary: '#FF5733' } }}
      />
      
      <TextInput
        mode="outlined"
        label="URL da Imagem"
        value={movieData.imagem_url}
        onChangeText={(text) => setMovieData({ ...movieData, imagem_url: text })}
        style={styles.input}
        theme={{ colors: { primary: '#FF5733' } }}
      />
      
      <TextInput
        mode="outlined"
        label="Gênero do Filme"
        value={movieData.genero}
        onChangeText={(text) => setMovieData({ ...movieData, genero: text })}
        style={styles.input}
        theme={{ colors: { primary: '#FF5733' } }}
      />
      
      <TextInput
        mode="outlined"
        label="Ano de Lançamento"
        value={movieData.ano}
        onChangeText={(text) => setMovieData({ ...movieData, ano: text })}
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

export default EditMovieScreen;
