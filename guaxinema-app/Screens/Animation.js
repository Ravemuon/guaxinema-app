import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Searchbar } from 'react-native-paper';
import { database } from '../Config/firebase';

function AnimationsScreen({ navigation }) {
  const [animations, setAnimations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAnimations, setFilteredAnimations] = useState([]);

  // Função para carregar animações do Firebase
  const loadAnimations = useCallback(() => {
    const animationsRef = database.ref('itens/animacao');
    
    const handleData = (snapshot) => {
      const data = snapshot.val();
      console.log("Dados recebidos do Firebase:", data);

      if (data) {
        const animationList = Object.keys(data).map((key) => ({
          id: key,
          title: data[key].nome || 'Sem nome',
          description: data[key].descricao || 'Sem descrição',
          image: data[key].imagem_url || require('../assets/anuncio.png'),
          releaseYear: data[key].ano_lancamento || 'Ano não disponível',
          genre: data[key].genero || 'Gênero não disponível',
          ratings: data[key].avaliacoes || [],
        }));

        // Calcular média das avaliações
        animationList.forEach(animation => {
          const totalRatings = animation.ratings.length;
          const sumRatings = animation.ratings.reduce((acc, curr) => acc + parseInt(curr), 0);
          animation.averageRating = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(1) : 'Sem avaliação';
        });

        setAnimations(animationList);
        setFilteredAnimations(animationList); // Inicialmente, mostrar todas as animações
      }
    };

    animationsRef.on('value', handleData);

    return () => {
      animationsRef.off('value', handleData); // Remove o listener ao desmontar
    };
  }, []);

  // Carregar animações ao montar
  useEffect(() => {
    loadAnimations();
  }, [loadAnimations]);

  // Função para filtrar animações com base na pesquisa
  const onSearch = query => {
    setSearchQuery(query);
    if (query) {
      const filtered = animations.filter(animation => 
        animation.title.toLowerCase().includes(query.toLowerCase()) || 
        animation.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredAnimations(filtered);
    } else {
      setFilteredAnimations(animations);
    }
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.cardTitle}>{item.title}</Title>
        <Image source={{ uri: item.image }} style={styles.image} accessible={true} accessibilityLabel="Imagem da animação" />
        <Paragraph style={styles.description}>{item.description}</Paragraph>

        <Text style={styles.extraInfo}>Ano de Lançamento: {item.releaseYear}</Text>
        <Text style={styles.extraInfo}>Gênero: {item.genre}</Text>

        <Text style={styles.extraInfo}>Média de Avaliação: {item.averageRating} ⭐</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DetalhesAnimacao', { animationId: item.id })}
          accessible={true}
          accessibilityLabel="Ver detalhes"
        >
          <Text style={styles.buttonText}>Ver Detalhes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate('EditarAnimacao', { animationId: item.id })}
          accessible={true}
          accessibilityLabel="Editar animação"
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Botão no topo para acessar a aba "Anime" */}
      <TouchableOpacity
        style={styles.topButton}
        onPress={() => navigation.navigate('anime')}
        accessible={true}
        accessibilityLabel="Ir para a aba Anime"
      >
        <Text style={styles.topButtonText}>Aba Anime</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Animações</Text>

      {/* Searchbar para pesquisa */}
      <Searchbar
        placeholder="Buscar animações..."
        onChangeText={onSearch}
        value={searchQuery}
        style={styles.searchBar}
        accessible={true}
        accessibilityLabel="Pesquisar animações"
      />

      <FlatList
        data={filteredAnimations}
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
  topButton: {
    backgroundColor: '#6a0dad',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: 'center',
  },
  topButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFC107',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchBar: {
    marginBottom: 20,
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
    backgroundColor: '#FFA500', // Cor do botão de editar
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AnimationsScreen;
