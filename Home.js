import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet,FlatList, Text, View, Image, Button, Alert, TouchableOpacity   } from 'react-native';
import PokeIco from './recursos/pokeico.png';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {colorPokemon, setZero} from './utils.js';

function clickPkmn(pkmn, navigation){
    return(
      navigation.navigate('Details', {itemID:pkmn.idpokemon, otherParams: pkmn})
      );
    }
    function pokeIcon(){
      return(
        <Image style={{width:200, height:200, alignSelf:'center'}}
             source={{uri:`${PokeIco}`}} />
        );
    }
const styles = StyleSheet.create({
    fontText: {
      fontFamily: 'Poppins-Light',
      fontSize: 20,
    },
  });

function HomeScreen({ navigation }){
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

  const getPkmn = async () => {
     try {
      const response = await fetch('https://antimonarchical-ram.000webhostapp.com/miAPI/api.php?gen=2');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      navigation.setOptions({headerTitle: pokeIcon(), headerTransparent:false});
    }
  }

    useEffect(() => {
      getPkmn();
    }, []);

    return(
      <View style={{margin:10}}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
        numColumns='3'
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity  onPress={() => clickPkmn(item, navigation)} style={{flex:1, width:'100%'}}>
          <View  style={{flex:1, borderColor:colorPokemon(item.tipo1),borderWidth:2,borderRadius:10 ,backgroundColor:'', margin: 5, width:'90%'}}>
              <View style={{ backgroundColor:'', alignSelf:'flex-end'}}>
                <Text style={{color:colorPokemon(item.tipo1), marginRight:3, fontFamily: 'Poppins-Light', fontSize:12, paddingRight:3, paddingTop:3}}>{setZero(item.idpokemon)}</Text>
              </View>
              <Image style={{width:100, height:100, alignSelf:'center'}}
                   source={{uri:`${item.imagen}`}} />
              <View style={{borderBottomLeftRadius:7, borderBottomRightRadius:7,width:'101%',borderColor:colorPokemon(item.tipo1),backgroundColor:colorPokemon(item.tipo1)}}>
                <Text style={{color:'white', alignSelf:'center', fontFamily: 'Poppins-Light', fontSize:12}}>{item.nombre}</Text>
              </View>
          </View>
          </TouchableOpacity  >
          )}
      />)
    }
      </View>
      );
  }

  export default HomeScreen;
