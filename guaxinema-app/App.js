import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper'; 

// Importando as telas
import LoginScreen from './Screens/Login';
import RegisterScreen from './Screens/Register';
import HomeScreen from './Screens/home';
import ProfileScreen from './Screens/Profile';
import NotificationsScreen from './Screens/Notification';
import FavoritesScreen from './Screens/Favorite';
import MyListScreen from './Screens/MyList';
import CommunityScreen from './Screens/Comunidade';
import SearchScreen from './Screens/Search';
import AtoresSreen from './Screens/Atores';
import CategoriasScreen from './Screens/Categorias';
import FilmesScreen from './Screens/Filmes';
import SeriesScreen from './Screens/Series';
import AnimationScreen from './Screens/Animation';
import JogosScreen from './Screens/Jogos';
import EditMovieScreen from './Screens/EditScreen/editmovie';
import EditJogoScreen from './Screens/EditScreen/editjogo';
import EditAnimacaoScreen from './Screens/EditScreen/editanimacao';
import EditASerieScreen from './Screens/EditScreen/editserie';
import DetalhesMovie from './Screens/DetalesScreen/DetalhesMovie';
import DetalhesJogo from './Screens/DetalesScreen/DetalhesJogos';
import DetalhesSerie from './Screens/DetalesScreen/DetalhesSerie';
import DetalhesAnimacao from './Screens/DetalesScreen/DetalhesAnimacao';
import AnimeScreen from './Screens/anime';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider> 
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
          <Stack.Screen name="MyList" component={MyListScreen} />
          <Stack.Screen name="Community" component={CommunityScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Atores" component={AtoresSreen} />
          <Stack.Screen name="Categorias" component={CategoriasScreen} />
          <Stack.Screen name="Filmes" component={FilmesScreen} />
          <Stack.Screen name="Series" component={SeriesScreen} />
          <Stack.Screen name="Animation" component={AnimationScreen} />
          <Stack.Screen name="Jogos" component={JogosScreen} />
          <Stack.Screen name="EditarFilme" component={EditMovieScreen} />
          <Stack.Screen name="EditarJogo" component={EditJogoScreen} />
          <Stack.Screen name="EditarAnimacao" component={EditAnimacaoScreen} />
          <Stack.Screen name="EditarSerie" component={EditASerieScreen} />
          <Stack.Screen name="DetalhesFilme" component={DetalhesMovie} />
          <Stack.Screen name="DetalhesJogo" component={DetalhesJogo} />
          <Stack.Screen name="DetalhesSerie" component={DetalhesSerie} />
          <Stack.Screen name="DetalhesAnimacao" component={DetalhesAnimacao} />
          <Stack.Screen name="anime" component={AnimeScreen} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
