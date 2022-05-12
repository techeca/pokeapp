import React, {Component, useState, useEffect, useCallback} from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, Image, Button, Alert, TouchableOpacity, TextInput  } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colorPokemon, setZero, capitalizeFirst} from '../../../utils.js';

function clickPkmn(pkmn, navigation){
    return(
      navigation.navigate('Details', {itemID:pkmn.id, otherParams: pkmn})
      );
    }

function CardPokemon({item}){
  const navigation = useNavigation();
  const [simpleData, setSimpleData] = useState('');
  const [isLoading, setLoading] = useState(true);
  const pkmn = item
  //console.log(item)

const getDetails = useCallback (() => {
  return fetch(pkmn.url)
  .then((res) => res.json())
  .then((res) => {
    //console.log(res.id)
    setSimpleData(res)
    //console.log(res.types[0].type.name)
    setLoading(false)
  })

}, [])


  useEffect(() => {

      //console.log(pkmn.name)
      getDetails()
    //navigation.setOptions({headerTitle: 'Pokedex', headerTransparent:false});
    //let tempItem = item
    //console.log(tempIt)
    //getData().then(() => setLoading(true));
  }, []);

  return (
    isLoading ? <></> :
    <TouchableOpacity onPress={() => clickPkmn(simpleData, navigation)} style={{flex:1, width:'100%'}}>
      <View style={{flex:1, borderColor:colorPokemon(simpleData.types[0].type.name), borderWidth:2, borderRadius:10 , backgroundColor:'', margin: 5, width:'90%'}}>
          <View style={{ backgroundColor:'', alignSelf:'flex-end'}}>
            <Text style={{color:colorPokemon(simpleData.types[0].type.name), marginRight:3,  fontSize:12, paddingRight:3, paddingTop:3}}>{setZero(simpleData.id)}</Text>
          </View>
          <Image style={{width:100, height:100, alignSelf:'center'}} source={{uri:`${simpleData.sprites['other']['official-artwork']['front_default']}`}} />
          <View style={{borderBottomLeftRadius:7, borderBottomRightRadius:7,width:'101%', borderColor:colorPokemon(simpleData.types[0].type.name), backgroundColor:colorPokemon(simpleData.types[0].type.name)}}>
            <Text style={{color:'white', alignSelf:'center', fontFamily: 'Poppins-Light', fontSize:12}}>{simpleData.name}</Text>
          </View>
      </View>
    </TouchableOpacity>
  );
}

export default CardPokemon;
