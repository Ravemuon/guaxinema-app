import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { database } from '../Config/firebase';

const CategoriesScreen = () => {
  const [categories, setCategories] = useState({
    filmes: [],
    jogos: [],
    séries: [],
    animações: []
  });
  const [visibility, setVisibility] = useState({
    filmes: false,
    jogos: false,
    séries: false,
    animações: false
  });

  useEffect(() => {
    const fetchData = async () => {
      const refs = {
        filmes: database.ref('itens/filmes'),
        jogos: database.ref('itens/jogo'),
        séries: database.ref('itens/serie'),
        animações: database.ref('itens/animacao')
      };

      Object.keys(refs).forEach((key) => {
        refs[key].on('value', (snapshot) => {
          const data = snapshot.val();
          setCategories((prev) => ({ ...prev, [key]: data ? Object.values(data) : [] }));
        });
      });

      return () => {
        Object.values(refs).forEach((ref) => ref.off());
      };
    };

    fetchData();
  }, []);

  const toggleCategory = (category) => {
    setVisibility((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Categorias</Text>

      {Object.keys(categories).map((category, index) => (
        <View key={index}>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => toggleCategory(category)}
          >
            <Text style={styles.categoryButtonText}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>

          {visibility[category] && (
            <View style={styles.subCategorySection}>
              {categories[category].map((item, idx) => (
                <TouchableOpacity key={idx} style={styles.subCategoryButton}>
                  <Text style={styles.subCategoryText}>{item.nome}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}
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
  categoryButton: {
    backgroundColor: '#444',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subCategorySection: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  subCategoryButton: {
    backgroundColor: '#555',
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  subCategoryText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CategoriesScreen;
