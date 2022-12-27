import React, {Component} from 'react';
import {StyleSheet, View, Text } from 'react-native';

export default class NavBar extends Component{
    render() {
        return(
            <View>
                <Text>toto</Text>
                <Text>tata</Text>
                <Text>tonton</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    navUl:{
        display:'flex',
        flexDirection: 'row',
        justifyContent:'space-around',
    },
    linkLi:{

    }
})