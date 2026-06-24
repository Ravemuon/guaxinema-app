// Screens/Notification.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Novo filme recomendado: "Inception"', date: '2025-01-28' },
    { id: '2', title: 'Seu filme favorito está disponível!', date: '2025-01-26' },
    { id: '3', title: 'Novos episódios de sua série favorita!', date: '2025-01-25' },
    { id: '4', title: 'Você tem uma nova mensagem na comunidade!', date: '2025-01-23' },
  ]);

  const handleNotificationClick = (notification) => {
    // Aqui você pode adicionar alguma lógica ao clicar na notificação
    alert(`Notificação clicada: ${notification.title}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.notification} onPress={() => handleNotificationClick(item)}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationDate}>{item.date}</Text>
          </TouchableOpacity>
        )}
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
  notification: {
    width: '90%',
    backgroundColor: '#333',
    borderRadius: 8,
    marginVertical: 10,
    padding: 15,
  },
  notificationTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  notificationDate: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 5,
  },
});

export default NotificationsScreen;
