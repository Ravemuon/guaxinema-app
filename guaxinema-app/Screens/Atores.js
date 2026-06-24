import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';

const ActorListScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const actors = [
    { id: '1', name: 'Geraldine Viswanathan', category: 'Wolliwood', image: require('../assets/geraldine_viswanathan.jpg') },
    { id: '2', name: 'Drew Starkey', category: 'Em Alta na Mídia', image: require('../assets/drew_starkey.webp') },
    { id: '3', name: 'LaKeith Stanfield', category: 'Polêmicos', image: require('../assets/lakeith_stanfield.jpg') },
    { id: '4', name: 'Mikey Madison', category: 'Novas Estrelas', image: require('../assets/mikey_madison.jpg') },
    { id: '5', name: 'Florence Pugh', category: 'Em Alta na Mídia', image: require('../assets/florence_pugh.jpg') },
    { id: '6', name: 'Anya Taylor-Joy', category: 'Wolliwood', image: require('../assets/anya_taylor_joy.jpg') },
    { id: '7', name: 'Barry Keoghan', category: 'Polêmicos', image: require('../assets/barry_keoghan.jpg') },
  ];

  const filteredActors = actors.filter(actor =>
    actor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderActorItem = ({ item }) => (
    <View style={styles.actorItem}>
      <TouchableOpacity style={styles.actorCircle}>
        <Image source={item.image} style={styles.actorImage} />
        <Text style={styles.actorName}>{item.name}</Text>
      </TouchableOpacity>
      <Text style={styles.actorCategory}>{item.category}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atores em Destaque</Text>

      {/* Campo de Pesquisa */}
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar atores"
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#888"
      />

      {/* Listagem de Atores */}
      <FlatList
        data={filteredActors}
        keyExtractor={(item) => item.id}
        renderItem={renderActorItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 20,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 20,
    color: '#fff',
    fontSize: 16,
  },
  actorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  actorCircle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  actorName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  actorCategory: {
    fontSize: 14,
    color: '#bbb',
    fontStyle: 'italic',
  },
});

export default ActorListScreen;
