import React, {Component, useState} from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, Image, Button, Alert, TouchableOpacity, TextInput  } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colorPokemon, setZero, capitalizeFirst} from '../../../utils.js';

function clickPkmn(pkmn){
  const navigation = useNavigation();
    return(
      navigation.navigate('Details', {itemID:pkmn.idpokemon, otherParams: pkmn})
      );
    }

export default class CardPokemon extends React.Component {
  shouldComponentUpdate(){
    return false;
  }
  render() {
    const {item} = this.props;
    return (
      <TouchableOpacity onPress={() => clickPkmn(item)} style={{flex:1, width:'100%'}}>
        <View style={{flex:1, borderColor:colorPokemon(item.tipo1), borderWidth:2, borderRadius:10 , backgroundColor:'', margin: 5, width:'90%'}}>
            <View style={{ backgroundColor:'', alignSelf:'flex-end'}}>
              <Text style={{color:colorPokemon(item.tipo1), marginRight:3,  fontSize:12, paddingRight:3, paddingTop:3}}>{setZero(item.idpokemon)}</Text>
            </View>
            <Image style={{width:100, height:100, alignSelf:'center'}} source={{uri:`${item.imagen}`}} />
            <View style={{borderBottomLeftRadius:7, borderBottomRightRadius:7,width:'101%', borderColor:colorPokemon(item.tipo1), backgroundColor:colorPokemon(item.tipo1)}}>
              <Text style={{color:'white', alignSelf:'center', fontFamily: 'Poppins-Light', fontSize:12}}>{item.nombre}</Text>
            </View>
        </View>
      </TouchableOpacity>
    );
  }
}
