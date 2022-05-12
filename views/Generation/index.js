import React, { Component, useEffect, useState, shouldComponentUpdate, useCallback } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, Image, Button, Alert, TouchableOpacity, TextInput, SafeAreaView   } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colorPokemon, setZero, capitalizeFirst, paginate, getPkmnGen} from '../../utils.js';
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
    const [simpleData, setSimpleData] = useState([]);
    const [detailData, setDetailData] = useState([]);
    const [inputText, setInputText] = useState("");
    const [search, setSearch] = useState('');

    const searchFilterFunction = (text) => {
    // Validación campo en blanco
    if (text) {

      // Si el campo no está en blanco
      // Capitaliza la busqueda
      const capSearch = capitalizeFirst(search);
      // Filtra data y actualiza filterData
      const newData = simpleData.results.filter(pkmn => pkmn.name.includes(capSearch))
      setDetailData(newData);
      setSearch(text);
      } else {
        // Campo en blanco
        // Actualiza filterData con data
        setDetailData(simpleData);
        setSearch(text);
      }
    };

    const getListPkmn = useCallback(() => {
        try {
         //Solicitud de pkmns ..api.php?gen=1 generacion 1 // ...api.php obtiene todos // "API" personal
         return fetch(`https://pokeapi.co/api/v2/pokemon/?${getPkmnGen(genID)}`)          //${getPkmnGen(genID)}
         .then((res) => res.json())
         .then((res) => {
           setSimpleData(res);
           setDetailData(res);
           setLoading(false);
         })
       } catch (error) {
         //console.error(error);
       } 
 }, [])

 function loadDashboard(){
  let tempData = []
  //console.log(simpleData.results)
  //if(inputText !== ''){tempData = simpleData.results.filter((pkmn) => console.log(pkmn.name))}

  if(tempData.length > 0){
    return(

      <FlatList numColumns='3' data={detailData.results}
      renderItem={({item}) => (
            <CardPokemon item={item} />
        )}/>
  )
  }else {
    //detailData.results.map((x) => console.log(x.name))
    return(
      <FlatList numColumns='3' data={detailData.results}
      renderItem={({item}) => (
            <CardPokemon item={item} />
        )}/>
    )
  }
}

    useEffect(() => {
      navigation.setOptions({headerTitle: 'Pokedex', headerTransparent:false});
      if(!simpleData.length){
        getListPkmn()
      }
    }, [simpleData.length, getListPkmn]);

    return(
      <SafeAreaView style={{backgroundColor:'white', height:'90%'}}>
        <View style={{margin:10, backgroundColor:'white'}}>
        {isLoading ? <ActivityIndicator size='large' color='black' style={{flex:1, justifyContent:'space-around', marginTop:'60%'}}/> : (
          <>
          {/*Cuadro de búsqueda*/}
          <View style={{borderWidth:1, borderRadius:10, height:40, flexDirection:'row', alignItems:'flex-start', borderColor:'gray', marginBottom:10, backgroundColor:'white'}}>
            {searchIcon()}
            <TextInput placeholder='Search' color='gray' onChangeText={(text) => searchFilterFunction(text)}/>
          </View>
          {/*Lista de Pokemon*/}

          {loadDashboard()}

        </>)
        }
        </View>
      </SafeAreaView >
      );
  }

export default PkmnList;
