import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { Card, Title, Paragraph, FAB, Portal, Provider, DefaultTheme, DarkTheme, Button, DataTable } from 'react-native-paper';
import { Appearance } from 'react-native';

function HomeScreen({ navigation }) {
  const [fabOpen, setFabOpen] = useState(false);
  const [isForYou, setIsForYou] = useState(false);
  const [theme, setTheme] = useState(DefaultTheme);

  const toggleScreen = () => {
    setIsForYou(!isForYou);
  };

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === 'dark' ? DarkTheme : DefaultTheme);
    });
    return () => subscription.remove();
  }, []);

  return (
    <Provider theme={theme}>
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleScreen} style={styles.toggleButton}>
          <Text style={styles.toggleButtonText}>{isForYou ? 'Voltar para Home' : 'Ir para For You'}</Text>
        </TouchableOpacity>
        
        <ScrollView style={styles.scrollContainer}>
          {isForYou ? (

            <Card style={styles.card}>
  <Card.Content>
    <Title style={styles.cardTitle}>Recomendações Personalizadas</Title>
    <Image 
      source={require('../assets/anuncio.png')} 
      style={[styles.image, {height: 200, width: '100%', resizeMode: 'cover'}]} 
    />
    <View style={styles.adContainer}>
      <Paragraph style={styles.adText}>
        Descubra novas experiências com base nos seus interesses. Explore filmes, séries, animações e mais com recomendações feitas para você!
      </Paragraph>
    </View>

    <Title style={styles.subTitle}>Aventura</Title>
    <View style={styles.actorSection}>
      <View style={styles.actorColumn}>
        <View style={styles.actorCircle}>
          <Image 
            source={require('../assets/miside.jpg')} 
            style={[styles.actorImage, {height: 150, width: 150, borderRadius: 75, resizeMode: 'cover'}]} 
          />
          <Text style={styles.actorName}>Aventura Épica 1</Text>
        </View>
        <View style={styles.actorCircle}>
          <Image 
            source={require('../assets/geraldine_viswanathan.jpg')} 
            style={[styles.actorImage, {height: 150, width: 150, borderRadius: 75, resizeMode: 'cover'}]} 
          />
          <Text style={styles.actorName}>Aventura Épica 2</Text>
        </View>
        <View style={styles.actorCircle}>
          <Image 
            source={require('../assets/sonic3.jpg')} 
            style={[styles.actorImage, {height: 150, width: 150, borderRadius: 75, resizeMode: 'cover'}]} 
          />
          <Text style={styles.actorName}>Aventura Épica 3</Text>
        </View>
      </View>
    </View>

    <Title style={styles.subTitle}>Ficção Científica</Title>
    <FlatList horizontal data={[{}, {}, {}]} renderItem={() => <View style={styles.movieBox} />} />
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.cardTitle}>Ficção Científica Recomendada</Title>
        <Image 
          source={require('../assets/geraldine_viswanathan.jpg')} 
          style={[styles.image, {height: 200, width: '100%', resizeMode: 'cover'}]} 
        />
        <View style={styles.adContainer}>
          <Paragraph style={styles.adText}>
            Uma jornada intergaláctica onde humanos enfrentam uma ameaça alienígena, misturando mistério e ação.
          </Paragraph>
        </View>
      </Card.Content>
    </Card>

    <Title style={styles.subTitle}>Comédia</Title>
    <FlatList horizontal data={[{}, {}, {}]} renderItem={() => <View style={styles.movieBox} />} />
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.cardTitle}>Comédia Imperdível</Title>
        <Image 
          source={require('../assets/logo.png')} 
          style={[styles.image, {height: 200, width: '100%', resizeMode: 'cover'}]} 
        />
        <View style={styles.adContainer}>
          <Paragraph style={styles.adText}>
            Uma história hilária sobre um grupo de amigos tentando sobreviver a um fim de semana caótico.
          </Paragraph>
        </View>
      </Card.Content>
    </Card>

    <Title style={styles.subTitle}>Drama</Title>
    <FlatList horizontal data={[{}, {}, {}]} renderItem={() => <View style={styles.movieBox} />} />
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.cardTitle}>Drama Intenso</Title>
        <Image 
          source={require('../assets/barry_keoghan.jpg')} 
          style={[styles.image, {height: 200, width: '100%', resizeMode: 'cover'}]} 
        />
        <View style={styles.adContainer}>
          <Paragraph style={styles.adText}>
            Um drama psicológico sobre relações familiares complicadas e segredos revelados ao longo do tempo.
          </Paragraph>
        </View>
      </Card.Content>
    </Card>

    <Title style={styles.subTitle}>Mistério</Title>
    <FlatList horizontal data={[{}, {}, {}]} renderItem={() => <View style={styles.movieBox} />} />
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.cardTitle}>Mistério e Suspense</Title>
        <Image 
          source={require('../assets/logo.png')} 
          style={[styles.image, {height: 200, width: '100%', resizeMode: 'cover'}]} 
        />
        <View style={styles.adContainer}>
          <Paragraph style={styles.adText}>
            Um suspense repleto de reviravoltas e mistérios, onde o investigador precisa desvendar segredos complexos.
          </Paragraph>
        </View>
      </Card.Content>
    </Card>

    <Title style={styles.subTitle}>Ação</Title>
    <FlatList horizontal data={[{}, {}, {}]} renderItem={() => <View style={styles.movieBox} />} />
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.cardTitle}>Ação Explosiva</Title>
        <Image 
          source={require('../assets/miside.jpg')} 
          style={[styles.image, {height: 200, width: '100%', resizeMode: 'cover'}]} 
        />
        <View style={styles.adContainer}>
          <Paragraph style={styles.adText}>
            Prepare-se para cenas de ação de tirar o fôlego com perseguições e lutas incríveis.
          </Paragraph>
        </View>
      </Card.Content>
    </Card>
  </Card.Content>
</Card>



          ) : (
            <>
<Card style={styles.card}>



  <Card.Content>
    <Title style={styles.cardTitle}>Em destaque hoje</Title>
    <Image source={require('../assets/anuncio.png')} style={styles.image} />
    <View style={styles.adContainer}>
      <Paragraph style={styles.adText}>
        A "Segunda Geek" destaca artistas independentes do universo geek em Florianópolis, com quadrinhos, ilustrações e mais. 
        Entre os destaques, a exposição de obras de DimiArts, Diego Moreau, e Femulets.
      </Paragraph>
    </View>
    <Button onPress={() => Linking.openURL('https://www.deolhonailha.com.br/florianopolis/noticias/mostra-exibe-obras-de-artistas-independentes-do-universo-geek/')}>Leia mais</Button>
  </Card.Content>
</Card>
<Button onPress={() => Linking.openURL('link_to_actor_page')}>Ver Mais</Button>

       <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Categorias')}
      >
        <Text style={styles.buttonText}>Ir para Categorias</Text>
      </TouchableOpacity>


<Title style={styles.subTitle}>Atores em Destaque</Title>
<View style={styles.actorSection}>
  <View style={styles.actorColumn}>
    <View style={styles.actorCircle}>
      <Image source={require('../assets/geraldine_viswanathan.jpg')} style={styles.actorImage} />
      <Text style={styles.actorName}>Geraldine Viswanathan</Text>
    </View>
    <View style={styles.actorCircle}>
      <Image source={require('../assets/drew_starkey.webp')} style={styles.actorImage} />
      <Text style={styles.actorName}>Drew Starkey</Text>
    </View>
    <View style={styles.actorCircle}>
      <Image source={require('../assets/lakeith_stanfield.jpg')} style={styles.actorImage} />
      <Text style={styles.actorName}>LaKeith Stanfield</Text>
    </View>
  </View>
  <View style={styles.actorColumn}>
    <View style={styles.actorCircle}>
      <Image source={require('../assets/mikey_madison.jpg')} style={styles.actorImage} />
      <Text style={styles.actorName}>Mikey Madison</Text>
    </View>
    <View style={styles.actorCircle}>
      <Image source={require('../assets/florence_pugh.jpg')} style={styles.actorImage} />
      <Text style={styles.actorName}>Florence Pugh</Text>
    </View>
    <View style={styles.actorCircle}>
      <Image source={require('../assets/anya_taylor_joy.jpg')} style={styles.actorImage} />
      <Text style={styles.actorName}>Anya Taylor-Joy</Text>
    </View>
    <View style={styles.actorCircle}>
      <Image source={require('../assets/barry_keoghan.jpg')} style={styles.actorImage} />
      <Text style={styles.actorName}>Barry Keoghan</Text>
    </View>
  </View>
</View>
 <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Atores')} // Navega para a tela de atores
    >
      <Text style={styles.buttonText}>Ver Mais</Text>
      <View style={styles.containerbutton} />
    </TouchableOpacity>


              <Title style={styles.subTitle}>Filmes</Title>
              <FlatList horizontal data={[{}, {}, {}]} renderItem={() => <View style={styles.movieBox} />} />
  <Card style={styles.card}>
  <Card.Content>
    <Title style={styles.cardTitle}>Em destaque hoje</Title>
    <Image source={require('../assets/sonic3.jpg')} style={styles.image} />
    <View style={styles.adContainer}>
      <Paragraph style={styles.adText}>
        Sonic: O ouriço mais rápido do mundo está de volta! Prepare-se para novas aventuras cheias de ação e velocidade.
      </Paragraph>
      
 <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Filmes')} // Navega para a tela de atores
    >
      <Text style={styles.buttonText}>Ver Tudo</Text>
      <View style={styles.containerbutton} />
    </TouchableOpacity>
    </View>
  </Card.Content>
</Card>

              
              <Title style={styles.subTitle}>Séries</Title>
              <FlatList horizontal data={[{}, {}, {}]} renderItem={() => <View style={styles.movieBox} />} />
                     <Card style={styles.card}>
  <Card.Content>
    <Title style={styles.cardTitle}>Em destaque hoje</Title>
    <Image source={require('../assets/11-13-scaled.jpg')} style={styles.image} />
    <View style={styles.adContainer}>
      <Paragraph style={styles.adText}>
        Round 6 volta com uma segunda temporada cheia de desafios e tensão. Prepare-se para mais jogos mortais!
      </Paragraph>
      
 <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Series')} // Navega para a tela de atores
    >
      <Text style={styles.buttonText}>Ver Tudo</Text>
      <View style={styles.containerbutton} />
    </TouchableOpacity>
    </View>
  </Card.Content>
</Card>


              
              <Title style={styles.subTitle}>Animações</Title>
              <FlatList horizontal data={[{}, {}, {}]} renderItem={() => <View style={styles.movieBox} />} />
              <Card style={styles.card}>
  <Card.Content>
    <Title style={styles.cardTitle}>Em destaque hoje</Title>
    <Image source={require('../assets/Arcane-Season-2.webp')} style={styles.image} />
    <View style={styles.adContainer}>
      <Paragraph style={styles.adText}>
        Arcane: Uma animação épica que mergulha no universo de League of Legends. 
        Prepare-se para explorar a história de Vi e Jinx em Piltover e Zaun.
      </Paragraph>
      
 <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Animation')} // Navega para a tela de atores
    >
      <Text style={styles.buttonText}>Ver Tudo</Text>
      <View style={styles.containerbutton} />
    </TouchableOpacity>
    </View>
  </Card.Content>
</Card>                          
              
              <Title style={styles.subTitle}>Jogos</Title>
              <FlatList horizontal data={[{}, {}, {}]} renderItem={() => <View style={styles.movieBox} />} />
<Card style={styles.card}>
  <Card.Content>
    <Title style={styles.cardTitle}>Em destaque hoje</Title>
    <Image source={require('../assets/miside.jpg')} style={styles.image} />
    <View style={styles.adContainer}>
      <Paragraph style={styles.adText}>
        Miside: Um jogo imersivo de aventura e mistério. Explore um mundo cheio de desafios e decisões complexas!
      </Paragraph>
      
 <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Jogos')} // Navega para a tela de atores
    >
      <Text style={styles.buttonText}>Ver Tudo</Text>
      <View style={styles.containerbutton} />
    </TouchableOpacity>
    </View>
  </Card.Content>
</Card>

            </>
          )}
        </ScrollView>

        <Portal>
          <FAB.Group
            open={fabOpen}
            icon={fabOpen ? 'close' : 'menu'}
            color="#fff"
            fabStyle={styles.fab}
            actions={[
              { icon: 'magnify', label: 'Buscar', onPress: () => navigation.navigate('Search') },
              { icon: 'account', label: 'Perfil', onPress: () => navigation.navigate('Profile') },
              { icon: 'bell', label: 'Notificações', onPress: () => navigation.navigate('Notifications') },
              { icon: 'star', label: 'Favoritos', onPress: () => navigation.navigate('Favorites') },
              { icon: 'format-list-bulleted', label: 'Minha Lista', onPress: () => navigation.navigate('MyList') },
              { icon: 'account-group', label: 'Comunidade', onPress: () => navigation.navigate('Community') },
              { icon: 'logout', label: 'Encerrar Conta', onPress: () => navigation.navigate('Login') },
            ]}
            onStateChange={() => setFabOpen(!fabOpen)}
          />
        </Portal>
      </View>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#1a1a1a', // Fundo mais escuro para simular cinema antigo
    paddingTop: 20
  },
  toggleButton: { 
    alignItems: 'center', 
    paddingVertical: 12, 
    paddingHorizontal: 25, 
    backgroundColor: '#3a3a3a', // Cor mais escura para combinar com a temática de guaxinim
    borderRadius: 25, 
    marginBottom: 10 
  },
  toggleButtonText: { 
    color: '#ddd', // Cor clara para contraste
    fontSize: 14 
  },
  scrollContainer: { paddingHorizontal: 10 },
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: '#292929', // Fundo mais escuro e próximo ao tom guaxinim
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444', // Fronteira levemente mais clara
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: '#FFC107', // Cor dourada, remetendo a um tom vintage
  },
  adContainer: {
  backgroundColor: "#555", // Cor intermediária, simulando uma área de destaque
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 8,
  padding: 10,  
},
  adText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", // Texto claro para o contraste
  },
  subTitle: { 
    color: '#FFC107', // Manter o dourado para subtítulos
    marginTop: 20, 
    fontSize: 18, 
    textAlign: 'center' 
  },
  image: {
    width: 230,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2, // Adiciona um toque sutil de borda para a imagem
    borderColor: '#444' // Cor da borda da imagem
  },
  actorSection: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: 20,
  paddingHorizontal: 10, // Padding extra para um layout mais confortável
},

actorCircle: {
  alignItems: 'center',
  marginRight: 15, // Adiciona espaçamento entre os atores
},

actorImage: {
  width: 80,
  height: 80,
  borderRadius: 40, // Torna as imagens circulares
  marginBottom: 10, // Espaço entre a imagem e o nome
},

actorName: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#fff',
},

actorColumn: {
  flexDirection: 'column',
  justifyContent: 'center', 
},
 containerbutton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Cor de fundo opcional
  },
  button: {
    backgroundColor: '#6a0dad', // Cor de fundo roxa
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 5, // Sombra
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff', // Cor do texto
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
