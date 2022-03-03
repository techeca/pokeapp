import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, Button, Alert, TouchableHighlight, ScrollView  } from 'react-native';
import PokeIco from '../../assets/pokeico.png';
import BackPkmn from '../../assets/poketransw.png';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colorPokemon, setZero, capitalizeFirst} from '../../utils.js';
//import ProfileCard from './ProfileCard';

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

  function DetailsItem({route, navigation }){
    const {itemID, otherParams} = route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [img, setImg] = useState([]);

    const getPkmn = async () => {
       try {
        //Datos generales de pokemon
        const response = await fetch(`${otherParams.url}`);
        const json = await response.json();
        setData(json);

      } catch (error) {
        //console.error(error);
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      navigation.setOptions({headerTitle:`${capitalizeFirst(otherParams.name.replace('-', ' '))}`, headerTransparent:true, headerTintColor:'black', headerStyle:{headerTransparent:true}});
      getPkmn();
    }, []);

    return(
          <ScrollView contentContainerStyle={{flexGrow: 1}} style={{backgroundColor:'lightskyblue', margin:0}}>
                {isLoading ? <ActivityIndicator size='large' color='black' style={{flex:1, justifyContent:'space-around'}}/> : (
                <View style={{flex:1, flexDirection:'row'}}>
                      {/*Numero de pokedex*/}
                      <Text style={{alignSelf:'flex-end', paddingRight:20, paddingTop:20, fontFamily:'Poppins-Light', color:'white'}}>{setZero(data.id)}</Text>
                      {/*Sprite item*/}
                      <View style={{marginTop:'30%', marginLeft:'5%', borderWidth:3, width:80, height:80, borderRadius:100, flexDirection:'row', justifyContent:'center'}}>
                        <Image style={{width:48, height:48, alignSelf:'center'}} source={{uri:`${data['sprites'].default}`}} />
                      </View>
                      {/*attributes item*/}
                      <View style={{borderWidth:3, margin:10, marginLeft:'20%', width:150, height:'20%', marginTop:'25%'}}>
                        {data['attributes'].map((attr) =>
                          <Text>{attr.name}</Text>
                        )}
                      </View>
                      {/*Tarjeta de datos bottom*/}
                      {/*<ProfileCard data={data} data2={data2} />*/}
                      {/*Imagen de pokemon*/}
                      {/*<View style={{marginTop:50, width:'100%', position:'absolute'}}>
                        {loadImagePkmn(data['sprites']['other']['official-artwork']['front_default'])}
                      </View>*/}
                </View>
              )}
          </ScrollView>
      );
  }

export default DetailsItem;
