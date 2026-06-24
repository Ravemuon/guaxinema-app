import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import { database } from '../../Config/firebase';

function SeriesDetailsScreen({ route }) {
  const { seriesId } = route.params; // Obtém o ID da série a partir da rota
  const [series, setSeries] = useState(null);

  useEffect(() => {
    const seriesRef = database.ref(`itens/serie/${seriesId}`); // Referência específica da série no Firebase
    const handleData = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSeries({
          title: data.nome,
          description: data.descricao || 'Sem descrição',
          // Se data.imagem_url existir e for uma string, usa-a; caso contrário, usa a imagem local
          image: data.imagem_url ? data.imagem_url : require('../../assets/anuncio.png'),
          releaseYear: data.ano_lancamento || 'Ano não disponível',
          genre: data.genero || 'Gênero não disponível',
          ratings: data.avaliacoes || [],
          comments: data.comentarios || [],
          director: data.diretor || 'Diretor não disponível',
          actors: data.atores || 'Atores não disponíveis',
          seasons: data.temporadas || 'Informações de temporadas não disponíveis',
          episodes: data.episodios || 'Informações de episódios não disponíveis',
        });
      }
    };

    seriesRef.on('value', handleData);
    // Remove o listener quando o componente for desmontado
    return () => seriesRef.off('value', handleData);
  }, [seriesId]);

  if (!series) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando detalhes da série...</Text>
      </View>
    );
  }

  // Cálculo da média de avaliações
  const totalRatings = series.ratings.length;
  const sumRatings = totalRatings > 0 ? series.ratings.reduce((acc, curr) => acc + parseInt(curr, 10), 0) : 0;
  const averageRating = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(1) : 'Sem avaliação';

  const renderComment = ({ item, index }) => (
    <View style={styles.commentContainer} key={index.toString()}>
      <Text style={styles.commentAuthor}>{item.author || 'Autor desconhecido'}</Text>
      <Text style={styles.commentText}>{item.comment || 'Sem comentário'}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {typeof series.image === 'string' ? (
        <Image source={{ uri: series.image }} style={styles.image} />
      ) : (
        <Image source={series.image} style={styles.image} />
      )}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{series.title}</Text>
        <Text style={styles.releaseYear}>Ano de Lançamento: {series.releaseYear}</Text>
        <Text style={styles.genre}>Gênero: {series.genre}</Text>
        <Text style={styles.director}>Diretor: {series.director}</Text>
        <Text style={styles.actors}>Atores: {series.actors}</Text>
        <Text style={styles.seasons}>Temporadas: {series.seasons}</Text>
        <Text style={styles.episodes}>Episódios: {series.episodes}</Text>
        <Text style={styles.description}>{series.description}</Text>
        <Text style={styles.rating}>Média de Avaliação: {averageRating} ⭐</Text>
      </View>

      <Text style={styles.commentsTitle}>Comentários:</Text>
      <FlatList
        data={series.comments}
        renderItem={renderComment}
        keyExtractor={(item, index) => index.toString()}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFC107',
    marginBottom: 10,
  },
  releaseYear: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  genre: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  director: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  actors: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  seasons: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  episodes: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFC107',
    marginTop: 20,
    marginBottom: 10,
  },
  commentContainer: {
    backgroundColor: '#2c2c2c',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  commentAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  commentText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
});

export default SeriesDetailsScreen;
