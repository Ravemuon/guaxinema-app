import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, Title, Portal, FAB } from 'react-native-paper';
import { database } from '../Config/firebase';

function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [allItems, setAllItems] = useState([]); // Todos os itens carregados
  const [filteredItems, setFilteredItems] = useState([]); // Itens filtrados para pesquisa

  const fetchData = async () => {
    setLoading(true);
    const categories = ['filmes', 'serie', 'animacao', 'jogo'];

    let allItemsList = [];

    try {
      await Promise.all(
        categories.map(async (category) => {
          const snapshot = await database.ref(`itens/${category}`).once('value');
          if (snapshot.exists()) {
            const data = snapshot.val();
            const itemArray = Object.keys(data).map((key) => ({
              id: key,
              nome: data[key].nome,
              genero: data[key].genero,
              ano: data[key].ano,
            }));
            allItemsList = [...allItemsList, ...itemArray]; // Adiciona os itens de cada categoria
          }
        })
      );

      setAllItems(allItemsList); // Armazena todos os itens
      setFilteredItems(allItemsList); // Exibe todos os itens inicialmente
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    return () => {
      // Limpa os listeners para evitar memory leaks
      const categories = ['filmes', 'serie', 'animacao', 'jogo'];
      categories.forEach(category => database.ref(`itens/${category}`).off()); // Limpa os listeners
    };
  }, []);

  // Função de pesquisa
  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);

    if (!searchQuery) {
      setFilteredItems(allItems); // Se a busca estiver vazia, exibe todos os itens
      return;
    }

    const filtered = allItems.filter(item =>
      item.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered); // Atualiza os itens filtrados
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Pesquisar..."
        placeholderTextColor="#BDBDBD"
        value={query}
        onChangeText={handleSearch}
        autoCapitalize="none"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#FFC107" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <Title style={styles.cardTitle}>{item.nome}</Title>
              </Card.Content>
            </Card>
          )}
          ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhum resultado encontrado</Text>}
        />
      )}

      {/* Menu Flutuante */}
      <Portal>
        <FAB
          style={styles.fab}
          icon="arrow-left"
          color="#fff"
          onPress={() => navigation.goBack()}
        />
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  input: {
    height: 45,
    borderColor: '#FFC107',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#2E2E2E',
    color: 'white',
    fontFamily: 'PressStart2P',
  },
  loader: {
    marginTop: 20,
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#2E2E2E',
    borderRadius: 10,
    padding: 15,
  },
  cardTitle: {
    color: '#FFC107',
    fontFamily: 'PressStart2P',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#BDBDBD',
    marginTop: 20,
    fontFamily: 'PressStart2P',
  },
  fab: {
    backgroundColor: '#8B4513',
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});

export default SearchScreen;
