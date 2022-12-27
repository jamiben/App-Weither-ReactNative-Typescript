import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, ActivityIndicator, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import axios from 'axios';

import NavBar from './Components/NavBar';
import Search from './Components/Search';
import CurrentWeather from './Components/CurrentWeather';
import Forecasts from './Components/Forecasts';



// 3- city, météo du moment, prévision météorologiques

const API_URL = (lat, lon)=> `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=93ab09f178709f7ab12634a336455d46&lang=fr&units=metric`
                                                                                      
export default function App() {
  // 1- Récuperation des coordonées du user
  const[loading, setLoading] = useState(true)
  const[data, setData] = useState(null)

  useEffect(()=>{
    const getCoordinates = async() =>{
    const {status} = await Location.requestForegroundPermissionsAsync()
      if(status !== 'granted'){
        return
      }

      const userLocation = await Location.getCurrentPositionAsync()
      getWeather(userLocation)
    }
    getCoordinates()
  }, []) 

  // 2- Faire une requête pour récuperer les données du serveur
const getWeather = async (location) =>{
  try{
    const response = await axios.get(API_URL(location.coords.latitude, location.coords.longitude))
    setData(response.data)
    setLoading(false)
  }catch(e){
    console.log("Erreur dans getWeather")
  }
}

  if(loading){
    return  <View style={styles.container}><ActivityIndicator /></View>
  }

  return (
      <ImageBackground style={ styles.imgBackground } resizeMode='cover' source={require('./assets/thunderstorm-gc447710e4_1920.jpg')}>
        <CurrentWeather data={data}/>
        <Forecasts data={data} />
      </ImageBackground>
  )
}

const styles = StyleSheet.create({
  imgBackground:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
  }

});
