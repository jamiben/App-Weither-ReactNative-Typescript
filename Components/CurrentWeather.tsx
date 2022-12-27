import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { isSameDay } from 'date-fns';

const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@4x.png`;

export default function CurrentWeather({ data }){
    
    const [currentWeather, setCurrentWeather] = useState(null)

    useEffect(() => {
        const currentW = data.list.filter(forecast =>{
            const today = new Date().getTime() + Math.abs(data.city.timezone * 1000)
            const forecastDate = new Date(forecast.dt * 1000)
            return isSameDay(today, forecastDate)
        });
        
        setCurrentWeather(currentW[0]);
    }, [data])

    return(
        <View style={style.containerCurrentWeither} >
            <Text style={style.city}>{data?.city?.name}</Text>
            <Text style={style.today}>Aujourd'hui</Text>
            <Image style={style.img} source={{uri: getIcon(currentWeather?.weather[0].icon) }} />
            <Text style={style.temp}>{Math.round(currentWeather?.main.temp)}°C</Text>
            <Text style={style.desc}>{currentWeather?.weather[0].description}</Text>
        </View>
    )
}

const COLOR = "#000";

const style = StyleSheet.create({
    city:{
        fontSize:36,
        fontWeight:"500",
        color: COLOR,
    },
    containerCurrentWeither:{
        marginTop:60,
        alignItems:'center',
        height:'65%'
    },
    img:{
        width:150,
        height:150,
    },
    today:{
        fontSize:24,
        fontWeight:"300",
        color:COLOR,
    },
    temp:{
        fontSize:80,
        fontWeight:"bold",
        color:COLOR,
    },
    desc:{
        fontSize:24,
        fontWeight:"bold",
        color:COLOR,
    },

})