import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, Image, Button, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { capitalizeFirst } from '../../utils.js';

function clickSubCategorie(url, navigation, nameSubCat, nameCat){
  //Deberia apuntar a List Items, se debe modificar y renombrar ListPokeball para que sea component re-utilizable
  const nombreCatAct = `List Pokeball`;
  return(
    navigation.navigate(`${nombreCatAct}`, {urlSub:url, otherParams:nameSubCat})
  );
}

function CategoriesItem({route, navigation}){
  const {catItem, otherParams} = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getCategories = async () => {
     try {
      //Solicitud de categorias
      const response = await fetch(`https://pokeapi.co/api/v2/item-pocket/${catItem}`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      //console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
    navigation.setOptions({headerTitle: `${otherParams}`, headerTransparent:false});
  }, []);

  return(
    <ScrollView>
      <View style={{margin:10}}>
      {isLoading ? <ActivityIndicator size='large' color='black' style={{flex:1, justifyContent:'space-around', marginTop:'60%'}}/> : (
        <>
        {/*Lista de categorias*/}
          {data['categories'].map((cat) =>
            <TouchableOpacity key={cat.name} onPress={() => clickSubCategorie(cat['url'], navigation, capitalizeFirst(cat['name']).replace('-', ' '), `${otherParams}`)}>
              <View style={{borderWidth:3, borderRadius:20,margin:10, flexDirection:'row', flexGrow:4, justifyContent:'space-around', borderColor:'lightsteelblue', backgroundColor:'aliceblue'}}>
                  <View style={{flexDirection:'row', flex:1, justifyContent:'center', alignSelf:'center'}}>
                    <Text style={{fontFamily:'Poppins-Bold', fontSize:20, color:'black'}}>{capitalizeFirst(cat['name']).replace('-', ' ')}</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Image style={{width:60, height:60, margin:5, marginRight:25, resizeMode:'contain'}} source={{uri:`https://antimonarchical-ram.000webhostapp.com/miAPI/images/${otherParams.toLowerCase()}/${cat['name'].replace('-', '')}.png`}} />
                  </View>
              </View>
            </TouchableOpacity>
          )}
      </>)
      }
      </View>
    </ScrollView>
    );
}

export default CategoriesItem;
