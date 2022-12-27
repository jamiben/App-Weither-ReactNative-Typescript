import React, { useEffect, useState } from "react";
import {Text, View, StyleSheet, ScrollView} from "react-native";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import Weather from "./Weather";


export default function Forecasts({data}){
    const [forecasts, setForecasts] = useState([])
    useEffect(() => {
        const forecastsData = data.list.map(f => {
            const dt = new Date(f.dt * 1000);
            return ({
                date: f.dt,
                hour: dt.getHours(),
                temp: Math.round(f.main.temp),
                icon: f.weather[0].icon,
                name: format(dt, "EEEE", {locale: fr })
            })
        });
// tableau affichant le jour de la semaine 1 fois par prévisions
        let newForecastsData = forecastsData.map(forecast => {
            return forecast.name;
        }).filter((day, index, self) =>{
            return self.indexOf(day) === index
        }).map((day) => {
            return{
                day,
                data: forecastsData.filter((forecast) => forecast.name === day)
            }
        })
        setForecasts(newForecastsData)
    }, [data]);
    return(
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={style.scroll} >
            {forecasts.map(f => (
            <View style={style.contentForecasts} > 
                <Text style={style.nameWeither}>{f.day.toUpperCase() }</Text>
                <View style={style.forecases} >                
                    {f.data.map(w => <Weather forecast={w} />)} 
                </View>
            </View>                          
            ))}
        </ScrollView>
    )
} 

const FONT = "#FFF";

const style = StyleSheet.create({
    contentForecasts:{
        display:'flex',
    },
    scroll:{
        width:'100%',
        height:"35%",
    },
    nameWeither:{
        marginBottom: 15,
        fontWeight:'bold',
        color: FONT,
    },
    forecases:{
        flexDirection:'row',
        marginHorizontal:10
    }
})