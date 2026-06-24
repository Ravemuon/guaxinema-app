import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { database } from '../../Config/firebase';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';

function EditSeriesScreen({ route, navigation }) {
  const { idSerie } = route.params;

  const [seriesData, setSeriesData] = useState({
    nome: '',
    descricao: '',
    imagem_url: '',
    genero: '',
    ano: ''
  });

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Carregar os dados da série no início
  useEffect(() => {
    const seriesRef = database.ref(`itens/serie/${idSerie}`);

    seriesRef.once('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSeriesData({
          nome: data.nome || '',
          descricao: data.descricao || '',
          imagem_url: data.imagem_url || '',
          genero: data.genero || '',
          ano: data.ano || ''
        });
      } else {
        console.log("Nenhuma série encontrada para esse ID:", idSerie);
      }
    });

    return () => {
      seriesRef.off();
    };
  }, [idSerie]);

  // Função para salvar os dados editados
  const handleSave = () => {
    const seriesRef = database.ref(`itens/serie/${idSerie}`);

    seriesRef.update({
      nome: seriesData.nome,
      descricao: seriesData.descricao,
      imagem_url: seriesData.imagem_url,
      genero: seriesData.genero,
      ano: seriesData.ano
    })
    .then(() => {
      setSnackbarMessage('Série atualizada com sucesso!');
      setSnackbarVisible(true);
      navigation.goBack();
    })
    .catch((error) => {
      console.log('Erro ao salvar os dados:', error);
      setSnackbarMessage('Erro ao salvar os dados!');
      setSnackbarVisible(true);
    });
  };

  // Função para deletar a série
  const handleDelete = () => {
    const seriesRef = database.ref(`itens/serie/${idSerie}`);

    seriesRef.remove()
      .then(() => {
        setSnackbarMessage('Série excluída com sucesso!');
        setSnackbarVisible(true);
        navigation.goBack();
      })
      .catch((error) => {
        console.log('Erro ao excluir a série:', error);
        setSnackbarMessage('Erro ao excluir a série!');
        setSnackbarVisible(true);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar Série</Text>
      
      <TextInput
        mode="outlined"
        label="Nome da Série"
        value={seriesData.nome}
        onChangeText={(text) => setSeriesData({ ...seriesData, nome: text })}
        style={styles.input}
        theme={{ colors: { primary: '#FF5733' } }}
      />
      
      <TextInput
        mode="outlined"
        label="Descrição"
        value={seriesData.descricao}
        onChangeText={(text) => setSeriesData({ ...seriesData, descricao: text })}
        style={styles.input}
        multiline
        theme={{ colors: { primary: '#FF5733' } }}
      />
      
      <TextInput
        mode="outlined"
        label="URL da Imagem"
        value={seriesData.imagem_url}
        onChangeText={(text) => setSeriesData({ ...seriesData, imagem_url: text })}
        style={styles.input}
        theme={{ colors: { primary: '#FF5733' } }}
      />
      
      <TextInput
        mode="outlined"
        label="Gênero da Série"
        value={seriesData.genero}
        onChangeText={(text) => setSeriesData({ ...seriesData, genero: text })}
        style={styles.input}
        theme={{ colors: { primary: '#FF5733' } }}
      />
      
      <TextInput
        mode="outlined"
        label="Ano de Lançamento"
        value={seriesData.ano}
        onChangeText={(text) => setSeriesData({ ...seriesData, ano: text })}
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

export default EditSeriesScreen;
