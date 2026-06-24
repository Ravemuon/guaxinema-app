import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { database } from '../Config/firebase';
import { format } from 'date-fns';

const CommunityScreen = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [username, setUsername] = useState('User123'); // Simulando usuário logado
  const [editPostId, setEditPostId] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const postsRef = database.ref('posts');
    const onValueChange = postsRef.on('value', snapshot => {
      const data = snapshot.val();
      const loadedPosts = [];
      for (let key in data) {
        loadedPosts.push({
          id: key,
          title: data[key].title,
          text: data[key].text,
          username: data[key].username,
          likes: data[key].likes || 0,
          timestamp: data[key].timestamp,
        });
      }
      setPosts(loadedPosts.reverse());
      setFilteredPosts(loadedPosts);
    });
    return () => postsRef.off('value', onValueChange);
  }, []);

  const handleCreateOrUpdatePost = () => {
    if (!postTitle || !postText) return;
    const newPost = {
      title: postTitle,
      text: postText,
      username: username,
      likes: 0,
      timestamp: Date.now(),
    };
    if (editPostId) {
      database.ref('posts').child(editPostId).update(newPost).then(() => {
        setPostTitle('');
        setPostText('');
        setEditPostId(null);
      }).catch(() => Alert.alert('Erro', 'Falha ao atualizar o post'));
    } else {
      database.ref('posts').push(newPost).then(() => {
        setPostTitle('');
        setPostText('');
      }).catch(() => Alert.alert('Erro', 'Falha ao criar o post'));
    }
  };

  const handleDeletePost = (id) => {
    database.ref('posts').child(id).remove().then(() => {
      Alert.alert('Sucesso', 'Post deletado com sucesso');
    }).catch(() => Alert.alert('Erro', 'Falha ao deletar o post'));
  };

  const handleLikePost = (id, likes) => {
    database.ref('posts').child(id).update({ likes: likes + 1 });
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = posts.filter(post => post.text.toLowerCase().includes(text.toLowerCase()) || post.title.toLowerCase().includes(text.toLowerCase()));
    setFilteredPosts(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={searchText}
        onChangeText={handleSearch}
        placeholder="Pesquisar posts..."
        style={styles.searchInput}
      />
      <TextInput
        value={postTitle}
        onChangeText={setPostTitle}
        placeholder="Título do post..."
        style={styles.input}
      />
      <TextInput
        value={postText}
        onChangeText={setPostText}
        placeholder="O que está acontecendo?"
        style={styles.input}
      />
      <Button title={editPostId ? 'Atualizar Post' : 'Criar Post'} onPress={handleCreateOrUpdatePost} color="#6A0DAD" />
      <FlatList
        data={filteredPosts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.username}>@{item.username}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardText}>{item.text}</Text>
            <Text style={styles.timestamp}>{format(new Date(item.timestamp), 'dd/MM/yyyy HH:mm')}</Text>
            <View style={styles.cardActions}>
              <TouchableOpacity onPress={() => handleLikePost(item.id, item.likes)} style={styles.likeButton}>
                <Text style={styles.actionButtonText}>❤️ {item.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeletePost(item.id)} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#1A1A1A' },
  searchInput: { height: 50, borderWidth: 1, borderRadius: 15, paddingLeft: 20, marginBottom: 10, backgroundColor: '#2A2A2A', color: '#FFF' },
  input: { height: 50, borderWidth: 1, borderRadius: 15, paddingLeft: 20, marginBottom: 20, backgroundColor: '#2A2A2A', color: '#FFF' },
  card: { backgroundColor: '#333', borderRadius: 15, padding: 20, marginBottom: 20, borderLeftWidth: 8, borderLeftColor: '#6A0DAD' },
  username: { color: '#A0A0A0', fontSize: 14, marginBottom: 5 },
  cardTitle: { fontSize: 18, color: '#FFF', fontWeight: 'bold', marginBottom: 5 },
  cardText: { fontSize: 16, color: '#E4E4E4', marginBottom: 10 },
  timestamp: { fontSize: 12, color: '#888', marginBottom: 10 },
  cardActions: { flexDirection: 'row', justifyContent: 'space-between' },
  actionButton: { padding: 10, backgroundColor: '#6A0DAD', borderRadius: 10 },
  likeButton: { padding: 10, backgroundColor: '#FF4444', borderRadius: 10 },
  actionButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});

export default CommunityScreen;
