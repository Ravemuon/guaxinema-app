import { View, Text, StyleSheet, FlatList } from 'react-native';

const FavoritesScreen = () => {
  const favorites = [
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      <FlatList
        data={favorites}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#121212',
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    fontSize: 18,
    color: '#fff',
    paddingVertical: 10,
  },
});

export default FavoritesScreen;
