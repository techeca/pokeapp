import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, Button, Alert, TouchableHighlight, ScrollView  } from 'react-native';
import PokeIco from '../../assets/pokeico.png';
import BackPkmn from '../../assets/poketransw.png';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colorPokemon, setZero} from '../../utils.js';
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

    const getPkmn = async () => {
       try {
        //Datos generales de pokemon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${itemID}`);
        const json = await response.json();
        setData(json);
        //Descripcion de pokemones
        const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${itemID}`);
        const json2 = await response2.json();
        setData2(json2);

      } catch (error) {
        //console.error(error);
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      navigation.setOptions({headerTitle:`${otherParams.nombre}`, headerTransparent:true, headerTintColor:'white', headerStyle:{headerTransparent:true}});
      getPkmn();
    }, []);

    return(
          <ScrollView contentContainerStyle={{flexGrow: 1}} style={{margin:0}}>
                {isLoading ? <ActivityIndicator size='large' color='black' style={{flex:1, justifyContent:'space-around'}}/> : (
                <View style={{backgroundColor:colorPokemon(data['types'][0].type.name), flex:1}}>
                      {/*Numero de pokedex*/}
                      <Text style={{alignSelf:'flex-end', paddingRight:20, paddingTop:20, fontFamily:'Poppins-Light', color:'white'}}>{setZero(data2.id)}</Text>
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
