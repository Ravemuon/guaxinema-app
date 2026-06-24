import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

const AnimeListScreen = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnimeList = useCallback(async () => {
    setLoading(true);
    setError(null); // Limpa erro anterior
    try {
      const response = await fetch('https://api.jikan.moe/v4/anime');
      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.status);
      }
      const data = await response.json();

      // Certifique-se de que a resposta contenha dados válidos
      if (!data || !data.data) {
        throw new Error('Dados do anime não encontrados');
      }

      setAnimeList(data.data);
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
      setError('Erro ao carregar os dados');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnimeList();
  }, [fetchAnimeList]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lista de Animes</Text>

      {/* Exibe mensagem de erro, se houver */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Exibe animação de carregamento enquanto os dados são buscados */}
      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={styles.activityIndicator} />
      ) : (
        <View>
          {animeList.map((anime) => (
            <Card key={anime.mal_id} style={styles.card}>
              <Card.Content>
                <Title style={styles.cardTitle}>{anime.title}</Title>
                <Paragraph style={styles.cardText}>
                  {anime.synopsis.length > 100 ? `${anime.synopsis.substring(0, 100)}...` : anime.synopsis}
                </Paragraph>
                <Text style={styles.attributeText}>
                  Gêneros: {anime.genres.map((genre) => genre.name).join(', ')}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      )}

      {/* Botão para recarregar a lista */}
      <Button mode="contained" onPress={fetchAnimeList} style={styles.reloadButton}>
        Recarregar Lista de Animes
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    color: '#FFC107',
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 14,
    color: '#fff',
  },
  attributeText: {
    color: '#fff',
    fontSize: 14,
  },
  reloadButton: {
    marginTop: 20,
    backgroundColor: '#6a0dad',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  activityIndicator: {
    marginTop: 20,
  },
});

export default AnimeListScreen;
