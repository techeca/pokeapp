import React, { Component, useEffect, useState, shouldComponentUpdate } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, Image, Button, Alert, TouchableOpacity, TextInput  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colorPokemon, setZero, capitalizeFirst} from '../../utils.js';
import CardPokemon from './CardPokemon';

function searchIcon() {
      return (
        <Image
          style={{ width: 30, height: 30, margin:5, marginLeft:10, marginTop:4}}
          source={require('../../assets/pokeico.png')}
        />
      );
    }

function PkmnList({ route, navigation }){
    const {genID} = route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [inputText, setInputText] = useState("");
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);

    const searchFilterFunction = (text) => {
    // Validación campo en blanco
    if (text) {
      // Si el campo no está en blanco
      // Capitaliza la busqueda
      const capSearch = capitalizeFirst(search);
      // Filtra data y actualiza filterData
      const newData = data.filter(pkmn => pkmn.nombre.includes(capSearch))
      setFilteredDataSource(newData);
      setSearch(text);
      } else {
        // Campo en blanco
        // Actualiza filterData con data
        setFilteredDataSource(data);
        setSearch(text);
      }
    };

    const getListPkmn = async () => {
       try {
        //Solicitud de pkmns ..api.php?gen=1 generacion 1 // ...api.php obtiene todos // "API" personal
        const response = await fetch(`https://antimonarchical-ram.000webhostapp.com/miAPI/api.php?gen=${genID}`);
        const json = await response.json();
        setData(json);
        setFilteredDataSource(json);
      } catch (error) {
        //console.error(error);
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      navigation.setOptions({headerTitle: 'Pokedex', headerTransparent:false});
      getListPkmn();
    }, []);

    return(
      <View style={{margin:10}}>
      {isLoading ? <ActivityIndicator size='large' color='black' style={{flex:1, justifyContent:'space-around', marginTop:'60%'}}/> : (
        <>
        {/*Cuadro de búsqueda*/}
        <View style={{borderWidth:1, borderRadius:10, height:40, flexDirection:'row', alignItems:'flex-start', borderColor:'gray', marginBottom:10, backgroundColor:'white'}}>
          {searchIcon()}
          <TextInput placeholder='Search' color='gray' onChangeText={(text) => searchFilterFunction(text)}/>
        </View>
        {/*Lista de Pokemon*/}
        <FlatList
          numColumns='3'
          data={filteredDataSource}
          renderItem={({item}) => (
              <CardPokemon item={item} />
          )}/>
      </>)
      }
      </View>
      );
  }

export default PkmnList;
