import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Picker } from 'react-native';
import { database } from '../Config/firebase';

export default function AddItemScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [anoLancamento, setAnoLancamento] = useState('');
  const [genero, setGenero] = useState('');
  const [tipoItem, setTipoItem] = useState('filmes');
  const [imagemUrl, setImagemUrl] = useState('');

  const adicionarItem = () => {
    if (!nome || !descricao || !anoLancamento || !genero || !imagemUrl) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const ref = database.ref(`itens/${tipoItem}`);

    ref.push({
      nome,
      descricao,
      ano_lancamento: anoLancamento,
      genero,
      imagem_url: imagemUrl,
    })
    .then(() => {
      alert(`${tipoItem.charAt(0).toUpperCase() + tipoItem.slice(1)} adicionado com sucesso!`);
      navigation.goBack();
    })
    .catch((error) => {
      alert('Erro ao adicionar item:', error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Adicionar Item</Text>

      {/* Picker para selecionar o tipo de item */}
      <Picker
        selectedValue={tipoItem}
        style={styles.picker}
        onValueChange={(itemValue) => setTipoItem(itemValue)}
      >
        <Picker.Item label="Filme" value="filmes" />
        <Picker.Item label="Série" value="serie" />
        <Picker.Item label="Jogo" value="jogo" />
        <Picker.Item label="Animação" value="animacao" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Nome do Item"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Ano de Lançamento"
        value={anoLancamento}
        onChangeText={setAnoLancamento}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Escreva o Gênero"
        value={genero}
        onChangeText={setGenero}
      />
      <TextInput
        style={styles.input}
        placeholder="URL da Imagem"
        value={imagemUrl}
        onChangeText={setImagemUrl}
      />

      <Button title={`Adicionar ${tipoItem.charAt(0).toUpperCase() + tipoItem.slice(1)}`} onPress={adicionarItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a1a1a',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFC107',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#444',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#fff',
    backgroundColor: '#292929',
  },
  picker: {
    height: 50,
    color: '#fff',
    backgroundColor: '#292929',
    marginBottom: 20,
  },
});
