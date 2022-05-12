import React, { Component, useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, Button, Alert, TouchableHighlight, ScrollView  } from 'react-native';
import PokeIco from '../../assets/pokeico.png';
import BackPkmn from '../../assets/poketransw.png';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colorPokemon, setZero, capitalizeFirst} from '../../utils.js';
import ProfileCard from './ProfileCard';

  function loadImagePkmn(urlimg){
    return(
      <Image style={{width:250, height:250, alignSelf:'center'}}
           source={{uri:`${urlimg}`}} />
      );
  }

  function loadBackPkmn(){
    return(
      <Image style={{width:250, height:250, alignSelf:'center'}}
           source={BackPkmn} />
      );
  }

  function DetailsPkmn({route, navigation }){
    const {itemID, otherParams} = route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [img, setImg] = useState([]);

    const getPkmn = useCallback (() => {
       try {
        //Datos generales de pokemon
        return fetch(`https://pokeapi.co/api/v2/pokemon/${itemID}`)
          .then((res) => res.json())
          .then((res) => {
            setData(res)
          })
      } catch (error) {
        //console.error(error);
      }
    }, [])

    const getDesc = useCallback (() => {
       try {
        //Datos generales de pokemon
        return fetch(`https://pokeapi.co/api/v2/pokemon-species/${itemID}`)
          .then((res) => res.json())
          .then((res) => {
            setData2(res)
            setLoading(false)
          })

      } catch (error) {
        //console.error(error);
      }
    }, [])

    useEffect(() => {
      navigation.setOptions({headerTitle:`${capitalizeFirst(otherParams.name)}`, headerTransparent:true, headerTintColor:'white', headerStyle:{headerTransparent:true}});
      getPkmn().then(() => getDesc());
    }, []);

    return(
          <ScrollView contentContainerStyle={{flexGrow: 1}} style={{margin:0}}>
                {isLoading ? <ActivityIndicator size='large' color='black' style={{flex:1, justifyContent:'space-around'}}/> : (
                <View style={{backgroundColor:colorPokemon(data['types'][0].type.name), flex:1}}>
                      {/*Numero de pokedex*/}
                      <Text style={{alignSelf:'flex-end', paddingRight:20, paddingTop:20, fontFamily:'Poppins-Light', color:'white'}}>{setZero(data.id)}</Text>
                      {/*Pokeball atras de pokemon*/}
                        <View style={{marginTop:-30}}>
                          {loadBackPkmn()}
                      </View>
                      {/*Tarjeta de datos de pokemon*/}
                      <ProfileCard data={data} data2={data2} />
                      {/*Imagen de pokemon*/}
                      <View style={{marginTop:50, width:'100%', position:'absolute'}}>
                        {loadImagePkmn(data['sprites']['other']['official-artwork']['front_default'])}
                      </View>
                </View>
              )}
          </ScrollView>
      );
  }

export default DetailsPkmn;
