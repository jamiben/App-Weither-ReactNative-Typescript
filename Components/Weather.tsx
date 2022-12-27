import React, { useEffect, useState } from "react";
import {Text, View, StyleSheet, ScrollView, Image} from "react-native";
import {format} from "date-fns";
import {fr} from "date-fns/locale";

const getWeatherIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@4x.png`;

export default function Weather({forecast}){

    return(
        <View style={style.containerWeather} >
        <Text style={style.hourWeither}>{forecast.hour}</Text>
        <Image style={style.image} source={{uri: getWeatherIcon(forecast?.icon) }} />
        <Text style={style.tempWeither}>{forecast.temp}°C</Text>
    </View>
    )
}

const FONT = "#FFF";
const COLOR = "#000";

const style = StyleSheet.create({
    containerWeather:{
        backgroundColor: COLOR,
        opacity: 0.5,
        height:140,
        width: 75,
        paddingVertical: 6,
        alignItems:'center',
        marginRight: 10,
        borderRadius: 50,
    },
    nameWeither:{
        color:FONT
    },
    hourWeither:{
        color:FONT
    },    
    tempWeither:{
        color:FONT,
        fontSize:18,
        fontWeight:'bold'
    },
    image:{
        width:50,
        height:50,
    }
})