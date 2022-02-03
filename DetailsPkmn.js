import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, Button, Alert, TouchableHighlight, ScrollView  } from 'react-native';
import PokeIco from './recursos/pokeico.png';
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
      <Image style={{width:200, height:200, alignSelf:'center'}}
           source={{uri:`${urlimg}`}} />
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
          <ScrollView style={{margin:0, backgroundColor:''}}>
                {isLoading ? <ActivityIndicator/> : (
                <View style={{backgroundColor:colorPokemon(data['types'][0].type.name)}}>
                      <Text style={{alignSelf:'flex-end', paddingRight:20, paddingTop:20, fontFamily:'Poppins-Light', color:'white'}}>{setZero(data2.id)}</Text>
                      {loadImagePkmn(data['sprites']['other']['official-artwork']['front_default'])}
                      <View style={{margin:10 ,backgroundColor:'white', borderRadius:10}}>

                          <View style={{margin:8, flex:1, flexDirection:'row', justifyContent:'center'}}>
                            {data['types'].map((type) =>
                              <Text key={type.type.name} style={{margin:3, textTransform:'capitalize', fontFamily:'Poppins-Light'}}>{type['type']['name']}</Text>
                            )}
                          </View>

                          <View style={{margin:5 ,flex:1, flexDirection:'row', justifyContent:'center'}}>
                              <Text style={{margin:3, fontFamily:'Poppins-Bold',fontSize:16, color:colorPokemon(data['types'][0].type.name)}}>About</Text>
                          </View>

                              <View style={{flex:3, flexDirection:'row', alignItems:'center'}}>
                                    <View style={{flex:1}}>
                                        <View style={{flexDirection:'column', alignItems:'center'}}>
                                            <View>
                                              <Text>{data['weight']}</Text>
                                            </View>
                                            <View>
                                              <Text>Weight</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{flex:1}}>
                                        <View style={{flexDirection:'column', alignItems:'center'}}>
                                            <View>
                                              <Text>{data['height']}</Text>
                                            </View>
                                            <View>
                                              <Text>Height</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{flex:1}}>
                                      <View style={{flexDirection:'column', alignItems:'center'}}>
                                        {data['abilities'].map((type) =>
                                          <Text key={type.ability.name} style={{margin:1, textTransform:'capitalize'}}>{type['ability']['name']}</Text>
                                        )}
                                      </View>
                                   </View>
                              </View>

                              <View style={{flex:1, flexDirection:'row', margin:16}}>
                                  <Text style={{fontFamily:'Poppins-Light', fontSize:12}}>{editDesc(data2['flavor_text_entries'][1]['flavor_text'])}</Text>
                              </View>

                          <View style={{margin:10 ,flex:1, flexDirection:'row', justifyContent:'center'}}>
                              <Text style={{fontFamily:'Poppins-Bold',fontSize:16, color:colorPokemon(data['types'][0].type.name)}}>Base Stats</Text>
                          </View>

                                <View style={{margin:0 ,flex:1, flexDirection:'row'}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
                                        <Text style={{fontWeight:'bold', color:colorPokemon(data['types'][0].type.name)}}>HP</Text>
                                    </View>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                                        <Text style={{}}>{data['stats'][0]['base_stat']}</Text>
                                    </View>
                                    <View style={{flex:4,backgroundColor:colorPokemon(data['types'][0].type.name),height:10, marginRight:30,borderRadius:10, flexDirection:'row', justifyContent:'flex-start'}}>
                                        <View style={{backgroundColor:colorPokemon(data['types'][0].type.name),width:`${data['stats'][0]['base_stat']}%`, borderRadius:10}}>
                                        </View>
                                    </View>
                                </View>

                                <View style={{margin:0 ,flex:1, flexDirection:'row'}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
                                        <Text style={{fontWeight:'bold', color:colorPokemon(data['types'][0].type.name)}}>ATK</Text>
                                    </View>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                                        <Text style={{}}>{data['stats'][1]['base_stat']}</Text>
                                    </View>
                                    <View style={{flex:4,backgroundColor:'gray', height:10, marginRight:30,borderRadius:10, flexDirection:'row', justifyContent:'flex-start'}}>
                                        <View style={{backgroundColor:colorPokemon(data['types'][0].type.name), width:`${data['stats'][1]['base_stat']}%`, borderRadius:10}}>
                                        </View>
                                    </View>
                                </View>

                                <View style={{margin:0 ,flex:1, flexDirection:'row'}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
                                        <Text style={{fontWeight:'bold', color:colorPokemon(data['types'][0].type.name)}}>DEF</Text>
                                    </View>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                                        <Text style={{}}>{data['stats'][2]['base_stat']}</Text>
                                    </View>
                                    <View style={{flex:4,backgroundColor:'gray', height:10, marginRight:30,borderRadius:10, flexDirection:'row', justifyContent:'flex-start'}}>
                                        <View style={{backgroundColor:colorPokemon(data['types'][0].type.name), width:`${data['stats'][2]['base_stat']}%`, borderRadius:10}}>
                                        </View>
                                    </View>
                                </View>

                                <View style={{margin:0 ,flex:1, flexDirection:'row'}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
                                        <Text style={{fontWeight:'bold', color:colorPokemon(data['types'][0].type.name)}}>SATK</Text>
                                    </View>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                                        <Text style={{}}>{data['stats'][3]['base_stat']}</Text>
                                    </View>
                                    <View style={{flex:4,backgroundColor:'gray', height:10, marginRight:30,borderRadius:10, flexDirection:'row', justifyContent:'flex-start'}}>
                                        <View style={{backgroundColor:colorPokemon(data['types'][0].type.name), width:`${data['stats'][3]['base_stat']}%`, borderRadius:10}}>
                                        </View>
                                    </View>
                                </View>

                                <View style={{margin:0 ,flex:1, flexDirection:'row'}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
                                        <Text style={{fontWeight:'bold', color:colorPokemon(data['types'][0].type.name)}}>SDEF</Text>
                                    </View>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                                        <Text style={{}}>{data['stats'][4]['base_stat']}</Text>
                                    </View>
                                    <View style={{flex:4,backgroundColor:'gray', height:10, marginRight:30,borderRadius:10, flexDirection:'row', justifyContent:'flex-start'}}>
                                        <View style={{backgroundColor:colorPokemon(data['types'][0].type.name), width:`${data['stats'][4]['base_stat']}%`, borderRadius:10}}>
                                        </View>
                                    </View>
                                </View>

                                <View style={{flex:1, flexDirection:'row', marginBottom:'3%'}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
                                        <Text style={{fontWeight:'bold', color:colorPokemon(data['types'][0].type.name)}}>SPD</Text>
                                    </View>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                                        <Text style={{}}>{data['stats'][5]['base_stat']}</Text>
                                    </View>
                                    <View style={{flex:4,backgroundColor:'gray', height:10, marginRight:30,borderRadius:10, flexDirection:'row', justifyContent:'flex-start'}}>
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
