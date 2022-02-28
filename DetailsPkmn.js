import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, Button, Alert, TouchableHighlight, ScrollView  } from 'react-native';
import PokeIco from './recursos/pokeico.png';
import BackPkmn from './recursos/poketransw.png';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colorPokemon, setZero} from './utils.js';

  function clickPkmn(pkmn, navigation){

    return(
      navigation.navigate('Details', {itemID:pkmn.idpokemon, otherParams: pkmn})
      );
  }

  function loadImagePkmn(urlimg){
    return(
      <Image style={{width:250, height:250, alignSelf:'center'}}
           source={{uri:`${urlimg}`}} />
      );
  }

  function loadBackPkmn(urlimg){
    return(
      <Image style={{width:250, height:250, alignSelf:'center'}}
           source={BackPkmn} />
      );
  }

  function editDesc(strBase){
    var newDesc = strBase.replace('\f', ' ');
    newDesc = newDesc.replace('\f', ' ');
    newDesc = newDesc.replace('\n', ' ');
    newDesc = newDesc.replace('\n', ' ');
    newDesc = newDesc.replace('\n', ' ');
    newDesc = newDesc.replace('\n', ' ');

      return (newDesc);
    }

  function DetailsPkmn({route, navigation }){
    const {itemID, otherParams} = route.params;

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [img, setImg] = useState([]);

    const getPkmn = async () => {
       try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${itemID}`);
        const json = await response.json();
        setData(json);

        const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${itemID}`);
        const json2 = await response2.json();
        setData2(json2);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        navigation.setOptions({headerTitle: `${otherParams.nombre}`, headerTransparent:true, headerTintColor:'white'});
      }
    }

    useEffect(() => {
      getPkmn();
    }, []);

    return(
          <ScrollView contentContainerStyle={{flexGrow: 1}} style={{margin:0}}>
                {isLoading ? <ActivityIndicator/> : (
                <View style={{backgroundColor:colorPokemon(data['types'][0].type.name), flex:1}}>
                      {/*Numero de pokedex*/}
                      <Text style={{alignSelf:'flex-end', paddingRight:20, paddingTop:20, fontFamily:'Poppins-Light', color:'white'}}>{setZero(data2.id)}</Text>
                      {/*Imagen de pokemon*/}
                      <View style={{flexWrap:'nowrap', alignItems:'center'}}>

                        <View style={{position:'absolute', marginTop:-30}}>
                          {loadBackPkmn()}
                        </View>
                        <View style={{marginTop:10, marginBottom:-20}}>
                          {loadImagePkmn(data['sprites']['other']['official-artwork']['front_default'])}
                        </View>

                      </View>
                      {/*Tarjeta de datos de pokemon*/}
                      <View style={{marginTop:-10 ,margin:10 ,backgroundColor:'white', borderRadius:10, flex:1}}>

                          {/*Tipos de pokemon*/}
                          <View style={{margin:10, flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            {data['types'].map((type) =>
                              <Text key={type.type.name} style={{fontSize:13,color:'white' ,backgroundColor:colorPokemon(type['type']['name']), borderRadius:15, margin:5, paddingLeft:8, paddingRight:8, textTransform:'capitalize', fontFamily:'Poppins-Bold'}}>{type['type']['name']}</Text>
                            )}
                          </View>

                          {/*Titulo About*/}
                          <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                              <Text style={{fontFamily:'Poppins-Bold',fontSize:18, color:colorPokemon(data['types'][0].type.name)}}>About</Text>
                          </View>

                              {/*Detalles de pokemon, peso, altura, y habilidades*/}
                              <View style={{marginTop:-15 ,flex:3, flexDirection:'row', alignItems:'center'}}>
                                    {/*Peso*/}
                                    <View style={{flex:1}}>
                                        <View style={{flexDirection:'column', alignItems:'center'}}>
                                            <View>
                                              <Text style={{fontFamily:'Poppins-Light'}}>{data['weight']}</Text>
                                            </View>
                                            <View>
                                              <Text style={{fontFamily:'Poppins-Light'}}>Weight</Text>
                                            </View>
                                        </View>
                                    </View>
                                    {/*Altura*/}
                                    <View style={{flex:1}}>
                                        <View style={{flexDirection:'column', alignItems:'center'}}>
                                            <View>
                                              <Text style={{fontFamily:'Poppins-Light'}}>{data['height']}</Text>
                                            </View>
                                            <View>
                                              <Text style={{fontFamily:'Poppins-Light'}}>Height</Text>
                                            </View>
                                        </View>
                                    </View>
                                    {/*Habilidades*/}
                                    <View style={{flex:1}}>
                                      <View style={{flexDirection:'column', alignItems:'center'}}>
                                        {data['abilities'].map((type) =>
                                          <Text key={type.ability.name} style={{fontFamily:'Poppins-Light' ,margin:1, textTransform:'capitalize'}}>{type['ability']['name']}</Text>
                                        )}
                                      </View>
                                   </View>
                              </View>

                              {/*Descripcion de pokemon*/}
                              <View style={{flex:1, flexDirection:'column', margin:6, alignItems:'center'}}>
                                  <Text style={{fontFamily:'Poppins-Light', fontSize:13}}>{editDesc(data2['flavor_text_entries'][1]['flavor_text'])}</Text>
                              </View>

                          {/*Titulo Base Stats*/}
                          <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
                              <Text style={{fontFamily:'Poppins-Bold',fontSize:18, color:colorPokemon(data['types'][0].type.name)}}>Base Stats</Text>
                          </View>

                                {/*Stats*/}
                                {/*HP*/}
                                <View style={{marginBottom:-15, flex:1, flexDirection:'row'}}>
                                    <View style={{flex:2, flexDirection:'row', justifyContent:'center'}}>
                                        <Text style={{fontFamily:'Poppins-Bold', color:colorPokemon(data['types'][0].type.name)}}>HP</Text>
                                    </View>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                                        <Text style={{fontSize:16}}>{data['stats'][0]['base_stat']}</Text>
                                    </View>
                                    <View style={{flex:4,backgroundColor:'whitesmoke',height:7, marginRight:30, borderRadius:10, flexDirection:'row', justifyContent:'flex-start'}}>
                                        <View style={{backgroundColor:colorPokemon(data['types'][0].type.name),width:`${data['stats'][0]['base_stat']}%`, borderRadius:10}}>
                                        </View>
                                    </View>
                                </View>
                                {/*ATK*/}
                                <View style={{marginBottom:-15 ,flex:1, flexDirection:'row'}}>
                                    <View style={{flex:2, flexDirection:'row', justifyContent:'center'}}>
                                        <Text style={{fontFamily:'Poppins-Bold', color:colorPokemon(data['types'][0].type.name)}}>ATK</Text>
                                    </View>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                                        <Text style={{fontSize:16}}>{data['stats'][1]['base_stat']}</Text>
                                    </View>
                                    <View style={{flex:4,backgroundColor:'whitesmoke', height:7, marginRight:30,borderRadius:10, flexDirection:'row', justifyContent:'flex-start'}}>
                                        <View style={{backgroundColor:colorPokemon(data['types'][0].type.name), width:`${data['stats'][1]['base_stat']}%`, borderRadius:10}}>
                                        </View>
                                    </View>
                                </View>
                                {/*DEF*/}
                                <View style={{marginBottom:-15,flex:1, flexDirection:'row'}}>
                                    <View style={{flex:2, flexDirection:'row', justifyContent:'center'}}>
                                        <Text style={{fontFamily:'Poppins-Bold', color:colorPokemon(data['types'][0].type.name)}}>DEF</Text>
                                    </View>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                                        <Text style={{fontSize:16}}>{data['stats'][2]['base_stat']}</Text>
                                    </View>
                                    <View style={{flex:4,backgroundColor:'whitesmoke', height:7, marginRight:30,borderRadius:10, flexDirection:'row', justifyContent:'flex-start'}}>
                                        <View style={{backgroundColor:colorPokemon(data['types'][0].type.name), width:`${data['stats'][2]['base_stat']}%`, borderRadius:10}}>
                                        </View>
                                    </View>
                                </View>
                                {/*SATK*/}
                                <View style={{marginBottom:-15 ,flex:1, flexDirection:'row'}}>
                                    <View style={{flex:2, flexDirection:'row', justifyContent:'center'}}>
                                        <Text style={{fontFamily:'Poppins-Bold', color:colorPokemon(data['types'][0].type.name)}}>SATK</Text>
                                    </View>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                                        <Text style={{fontSize:16}}>{data['stats'][3]['base_stat']}</Text>
                                    </View>
                                    <View style={{flex:4,backgroundColor:'whitesmoke', height:7, marginRight:30,borderRadius:10, flexDirection:'row', justifyContent:'flex-start'}}>
                                        <View style={{backgroundColor:colorPokemon(data['types'][0].type.name), width:`${data['stats'][3]['base_stat']}%`, borderRadius:10}}>
                                        </View>
                                    </View>
                                </View>
                                {/*SDEF*/}
                                <View style={{marginBottom:-15 ,flex:1, flexDirection:'row'}}>
                                    <View style={{flex:2, flexDirection:'row', justifyContent:'center'}}>
                                        <Text style={{fontFamily:'Poppins-Bold', color:colorPokemon(data['types'][0].type.name)}}>SDEF</Text>
                                    </View>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                                        <Text style={{fontSize:16}}>{data['stats'][4]['base_stat']}</Text>
                                    </View>
                                    <View style={{flex:4,backgroundColor:'whitesmoke', height:7, marginRight:30,borderRadius:10, flexDirection:'row', justifyContent:'flex-start'}}>
                                        <View style={{backgroundColor:colorPokemon(data['types'][0].type.name), width:`${data['stats'][4]['base_stat']}%`, borderRadius:10}}>
                                        </View>
                                    </View>
                                </View>
                                {/*SPD*/}
                                <View style={{flex:1, flexDirection:'row', marginBottom:'3%'}}>
                                    <View style={{flex:2, flexDirection:'row', justifyContent:'center'}}>
                                        <Text style={{fontFamily:'Poppins-Bold', color:colorPokemon(data['types'][0].type.name)}}>SPD</Text>
                                    </View>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                                        <Text style={{fontSize:16}}>{data['stats'][5]['base_stat']}</Text>
                                    </View>
                                    <View style={{flex:4,backgroundColor:'whitesmoke', height:7, marginRight:30,borderRadius:10, flexDirection:'row', justifyContent:'flex-start'}}>
                                        <View style={{backgroundColor:colorPokemon(data['types'][0].type.name), width:`${data['stats'][5]['base_stat']}%`, borderRadius:10}}>
                                        </View>
                                    </View>
                                </View>
                      </View>
                </View>
              )}
          </ScrollView>
      );
  }

export default DetailsPkmn;
