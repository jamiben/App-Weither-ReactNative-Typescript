import React, {Component} from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default class Home extends Component{

    constructor (props){
        super(props)
        this.state = {
            city: "Paris"
        }
    }

    // Création de la méthode qui va permettre de modifier le state initial du constructeur
    setCity (city){
        this.setState({city});
    }
    render(){
        return(
        <View>
            {/* pour que le texte s'affiche dans l'input ajouter le multiligne={true} et envelopper l'input dans une <View> */}
            <TextInput style={style.textInput} onChangeText={text => this.setCity(text)} multiline={true} />   
        </View>
        )   
    }
}

const style = StyleSheet.create({
    textInput: {
        marginTop: 40,
        height: 40,
        borderColor: '#778899',
        borderWidth:'1',
        padding:20,
    }
})