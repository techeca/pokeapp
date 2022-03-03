import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, Image, Button, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { capitalizeFirst } from '../../utils.js';

function ListPokeball({route, navigation}){
  const {urlSub, otherParams} = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getCategories = async () => {
     try {
      //Solicitud de categorias
      const response = await fetch(`${urlSub}`);
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
      <View style={{margin:10, flexWrap:'wrap', flexDirection:'row', justifyContent:'center'}}>
      {isLoading ? <ActivityIndicator size='large' color='black' style={{flex:1, justifyContent:'space-around', marginTop:'60%'}}/> : (
        <>
        {/*Lista de pokeball 2 || columnas*/}
          {data['items'].map((item) =>
            <TouchableOpacity key={item.name}>
              <View style={{width:150, height:120, borderWidth:3, borderRadius:20, margin:5, flexDirection:'column', flexGrow:4, justifyContent:'space-around', borderColor:'lightsteelblue', backgroundColor:'aliceblue'}}>

                  <View style={{flexDirection:'row', borderWidth:0, justifyContent:'center', alignSelf:'center'}}>
                    <Image style={{height:60, width:60, margin:8, resizeMode:'contain'}} source={{uri:`https://antimonarchical-ram.000webhostapp.com/miAPI/images/items/${item['name'].replace('-', '').toUpperCase()}.png`}} />
                  </View>

                  <View style={{flexDirection:'row', justifyContent:'center', alignSelf:'center'}}>
                    <Text style={{fontFamily:'Poppins-Bold', fontSize:20, color:'black'}}>{capitalizeFirst(item['name']).replace('-', ' ')}</Text>
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

export default ListPokeball;
