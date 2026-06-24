import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import { database } from '../../Config/firebase';

function MovieDetailsScreen({ route }) {
  const { movieId } = route.params; // Obtém o ID do filme da navegação
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const movieRef = database.ref(`itens/filmes/${movieId}`); // Referência específica do filme
    const handleData = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMovie({
          title: data.nome,
          description: data.descricao || 'Sem descrição',
          image: data.imagem_url || require('../../assets/anuncio.png'),
          releaseYear: data.ano_lancamento || 'Ano não disponível',
          genre: data.genero || 'Gênero não disponível',
          ratings: data.avaliacoes || [],
          comments: data.comentarios || [],
          director: data.diretor || 'Diretor não disponível',
          actors: data.atores || 'Atores não disponíveis',
        });
      }
    };

    movieRef.on('value', handleData);
    return () => movieRef.off('value', handleData); // Remove o listener ao sair da tela
  }, [movieId]);

  if (!movie) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando detalhes do filme...</Text>
      </View>
    );
  }

  const totalRatings = movie.ratings.length;
  const sumRatings = totalRatings > 0 ? movie.ratings.reduce((acc, curr) => acc + parseInt(curr), 0) : 0;
  const averageRating = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(1) : 'Sem avaliação';

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentAuthor}>{item.author || 'Autor desconhecido'}</Text>
      <Text style={styles.commentText}>{item.comment || 'Sem comentário'}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Image source={movie.image} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.releaseYear}>Ano de Lançamento: {movie.releaseYear}</Text>
        <Text style={styles.genre}>Gênero: {movie.genre}</Text>
        <Text style={styles.director}>Diretor: {movie.director}</Text>
        <Text style={styles.actors}>Atores: {movie.actors}</Text>
        <Text style={styles.description}>{movie.description}</Text>
        <Text style={styles.rating}>Média de Avaliação: {averageRating} ⭐</Text>
      </View>

      <Text style={styles.commentsTitle}>Comentários:</Text>
      <FlatList
        data={movie.comments}
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

export default MovieDetailsScreen;
