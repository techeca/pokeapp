import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, Image, Button, Alert, TouchableOpacity   } from 'react-native';
import PokeIco from './recursos/pokeico.png';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colorPokemon, setZero} from './utils.js';

function clickPkmn(pkmn, navigation){
    return(
      navigation.navigate('Details', {itemID:pkmn.idpokemon, otherParams: pkmn})
      );
    }

function clickGen(generation, navigation){
    return(
      navigation.navigate('Pkmn List', {genID:generation})
      );
    }

function pokeIcon(){
      return(
        <Image style={{width:200, height:200, alignSelf:'center'}} source={{uri:`${PokeIco}`}} />
        );
    }

const styles = StyleSheet.create({
    fontText: {
      fontFamily: 'Poppins-Light',
      fontSize: 20,
      },
    });

function HomeScreen({ navigation }){
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getPkmn = async () => {
       try {
        //Solicitud de pkmns ..api.php?gen=1 generacion 1 // ...api.php obtiene todos // "API" personal
        const response = await fetch('https://antimonarchical-ram.000webhostapp.com/miAPI/api.php?gen=1');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        navigation.setOptions({headerTitle: pokeIcon(), headerTransparent:false});
      }
    }

    useEffect(() => {
      getPkmn();
    }, []);

    return(
      <View style={{margin:10}}>
      {isLoading ? <ActivityIndicator/> : (
        <View>
          <View style={{margin:10}}>
              <Text style={{fontFamily:'Poppins-Bold',fontSize:18}}>GENERATION</Text>
          </View>
            <View style={{borderWidth:2, margin:10, flexDirection:'row', flexGrow:2, justifyContent:'space-around'}}>
                <View style={{}}>
                  <Text>I</Text>
                </View>

                <View style={{}}>
                  <Text>II</Text>
                </View>
            </View>
            <View style={{flexDirection:'column', justifyContent:'space-evenly'}}>
              <Button
                onPress={() => clickGen('1', navigation)}
                title="GEN I"
                color="crimson"
              />
              <Button
                onPress={() => clickGen('2', navigation)}
                title="GEN II"
                color="#841584"
              />
              <Button
                onPress={() => clickGen('3', navigation)}
                title="GEN III"
                color="#841584"
              />
            </View>
        </View>
        )
      }
      </View>
      );
  }

export default HomeScreen;
