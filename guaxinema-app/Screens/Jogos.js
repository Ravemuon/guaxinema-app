import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { database } from '../Config/firebase';

function GamesScreen({ navigation }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para carregar jogos do Firebase
  const loadGames = useCallback(() => {
    const gamesRef = database.ref('itens/jogo');

    const handleData = (snapshot) => {
      const data = snapshot.val();
      console.log("Dados recebidos do Firebase:", data);

      if (data) {
        const gameList = Object.keys(data).map((key) => ({
          id: key,
          title: data[key].nome || 'Sem nome',
          description: data[key].descricao || 'Sem descrição',
          image: data[key].imagem_url || require('../assets/anuncio.png'),
          releaseYear: data[key].ano_lancamento || 'Ano não disponível',
          genre: data[key].genero || 'Gênero não disponível',
          ratings: data[key].avaliacoes || [],
        }));

        // Calcular média das avaliações de forma mais limpa
        gameList.forEach(game => {
          const totalRatings = game.ratings.length;
          const sumRatings = game.ratings.reduce((acc, curr) => acc + parseInt(curr), 0);
          game.averageRating = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(1) : 'Sem avaliação';
        });

        setGames(gameList);
        setLoading(false); // Definir como não carregando após os dados serem recebidos
      } else {
        setError('Nenhum jogo encontrado.');
        setLoading(false);
      }
    };

    const handleError = (error) => {
      setError(error.message);
      setLoading(false);
    };

    gamesRef.on('value', handleData, handleError);

    return () => {
      gamesRef.off('value', handleData); // Remove o listener ao desmontar
    };
  }, []);

  // Carregar os jogos ao montar
  useEffect(() => {
    loadGames();
  }, [loadGames]);

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.cardTitle}>{item.title}</Title>
        <Image source={{ uri: item.image }} style={styles.image} accessible={true} accessibilityLabel="Imagem do jogo" />
        <Paragraph style={styles.description}>{item.description}</Paragraph>

        <Text style={styles.extraInfo}>Ano de Lançamento: {item.releaseYear}</Text>
        <Text style={styles.extraInfo}>Gênero: {item.genre}</Text>

        <Text style={styles.extraInfo}>Média de Avaliação: {item.averageRating} ⭐</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DetalhesJogos', { gameId: item.id })}
          accessible={true}
          accessibilityLabel="Ver detalhes do jogo"
        >
          <Text style={styles.buttonText}>Ver Detalhes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate('EditarJogo', { gameId: item.id })}
          accessible={true}
          accessibilityLabel="Editar jogo"
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFC107" />
        <Text style={styles.loadingText}>Carregando jogos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Jogos</Text>
      <FlatList
        data={games}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#FFC107',
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default GamesScreen;
