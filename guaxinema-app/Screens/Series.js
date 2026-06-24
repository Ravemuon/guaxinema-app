import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { database } from '../Config/firebase';

function SeriesScreen({ navigation }) {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const seriesRef = database.ref('itens/serie');
    const handleData = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const seriesList = Object.keys(data).map((key) => ({
          id: key,
          title: data[key].nome,
          description: data[key].descricao || 'Sem descrição',
          image: data[key].imagem_url || require('../assets/anuncio.png'),
          releaseYear: data[key].ano || 'Ano não disponível',
          genre: data[key].genero || 'Gênero não disponível',
          ratings: data[key].avaliacoes || [],
        }));

        seriesList.forEach(serie => {
          const totalRatings = serie.ratings.length;
          const sumRatings = totalRatings > 0 ? serie.ratings.reduce((acc, curr) => acc + parseInt(curr), 0) : 0;
          serie.averageRating = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(1) : 'Sem avaliação';
        });

        setSeries(seriesList);
      }
    };

    seriesRef.on('value', handleData);
    return () => seriesRef.off('value', handleData);
  }, []);

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.cardTitle}>{item.title}</Title>
        {typeof item.image === 'string' ? (
          <Image source={{ uri: item.image }} style={styles.image} />
        ) : (
          <Image source={item.image} style={styles.image} />
        )}
        <Paragraph style={styles.description}>{item.description}</Paragraph>
        <Text style={styles.extraInfo}>Ano de Lançamento: {item.releaseYear}</Text>
        <Text style={styles.extraInfo}>Gênero: {item.genre}</Text>
        <Text style={styles.extraInfo}>Média de Avaliação: {item.averageRating} ⭐</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DetalhesSerie', { idSerie: item.id })}>
          <Text style={styles.buttonText}>Ver Detalhes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => navigation.navigate('EditarSerie', { idSerie: item.id })}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Séries</Text>
      <FlatList data={series} renderItem={renderItem} keyExtractor={(item) => item.id} contentContainerStyle={styles.flatListContainer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFC107',
    marginBottom: 20,
    textAlign: 'center',
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#292929',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFC107',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
  },
  extraInfo: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#6a0dad',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#FFA500',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SeriesScreen;
