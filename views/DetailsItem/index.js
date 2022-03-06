import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, Button, Alert, TouchableHighlight, ScrollView  } from 'react-native';
import PokeIco from '../../assets/poketransw.png';
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
      navigation.setOptions({headerTitle:`${capitalizeFirst(otherParams.name.replace('-', ' '))}`, headerTransparent:true, headerTintColor:'dimgray', headerStyle:{headerTransparent:true}});
      getPkmn();
    }, []);

    return(
          <ScrollView contentContainerStyle={{flexGrow: 1}} style={{backgroundColor:'lightsteelblue'}}>
                {isLoading ? <ActivityIndicator size='large' color='black' style={{flex:1, justifyContent:'space-around'}}/> : (
                <View>
                <View style={{marginTop:60, width:'100%', position:'absolute', marginLeft:-6}}>
                  <Image source={PokeIco} />
                </View>
                {/*Numero de pokedex*/}
                <Text style={{alignSelf:'flex-end', paddingRight:20, paddingTop:20, fontFamily:'Poppins-Light', color:'white'}}>{setZero(data.id)}</Text>
                  <View style={{flex:1, flexDirection:'row'}}>
                        {/*Sprite item*/}
                        <View style={{borderColor:'lightslategrey', marginTop:'26%', marginLeft:'20%', borderWidth:0, width:80, height:80, borderRadius:100, flexDirection:'row', justifyContent:'center'}}>
                          <Image style={{width:48, height:48, alignSelf:'center'}} source={{uri:`${data['sprites'].default}`}} />
                        </View>
                        {/*attributes item*/}
                        <View style={{borderWidth:0, borderRadius:20, margin:10, marginLeft:'22%', width:150, height:'60%', marginTop:'25%'}}>
                          {data['attributes'].map((attr) =>
                            <View style={{}}>
                            <Text key={attr.name} style={{fontFamily:'Poppins-Light', marginTop:7, backgroundColor:'white', width:120, alignSelf:'center'}}>{capitalizeFirst(attr.name.replace('-', ' ')).replace('-', ' ')}</Text>
                            </View>
                          )}
                        </View>
                        {/*Tarjeta de datos bottom*/}
                        {/*<ProfileCard data={data} data2={data2} />*/}
                        {/*Imagen de pokemon*/}
                        {/*<View style={{marginTop:50, width:'100%', position:'absolute'}}>
                          {loadImagePkmn(data['sprites']['other']['official-artwork']['front_default'])}
                        </View>*/}
                  </View>
                  <View style={{borderWidth:2, borderColor:'lightslategrey', marginTop:'15%', height:'45%', margin:10, borderRadius:10, backgroundColor:'white'}}>
                    <Text style={{fontFamily:'Poppins-Bold', fontSize:24, alignSelf:'center', marginTop:10}}>Description</Text>
                    <Text style={{fontFamily:'Poppins-Light', margin:10, fontSize:16}}>{data['effect_entries'][0].effect.replace('\n', '')}</Text>
                    <Text style={{fontFamily:'Poppins-Bold', fontSize:18, alignSelf:'flex-end', marginRight:10}}>Price</Text>
                    <Text style={{fontFamily:'Poppins-Light', alignSelf:'flex-end', marginRight:10}}>{data['cost']}</Text>
                  </View>
                </View>
              )}
          </ScrollView>
      );
  }

export default DetailsItem;
