import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Card, Title, Button, TextInput } from 'react-native-paper';

function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');

  const handleSaveChanges = () => {
    // Lógica para salvar as alterações no perfil
    console.log('Alterações salvas');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Avatar.Image source={{ uri: 'https://www.example.com/path-to-avatar.jpg' }} size={120} />
        <Title style={styles.name}>{name}</Title>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Informações Pessoais</Title>
          <TextInput
            label="Nome"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
          />
          <TextInput
            label="Telefone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Biografia</Title>
          <TextInput
            label="Biografia"
            value={bio}
            onChangeText={setBio}
            multiline
            numberOfLines={4}
            style={styles.textarea}
          />
        </Card.Content>
      </Card>

      <Button mode="contained" onPress={handleSaveChanges} style={styles.button}>
        Salvar Alterações
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
  textarea: {
    marginBottom: 10,
    height: 100,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#6200ee',
  },
});

export default ProfileScreen;
