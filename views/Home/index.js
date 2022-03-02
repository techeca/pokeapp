import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import PokeballsBtnImg from '../../assets/pokeballs.png';

function clickGen(generation, navigation){
    return(
      navigation.navigate('Generation', {genID:generation})
      );
    }
function clickCategories(categorie, navigation, nameCat){
  return(
    navigation.navigate('Categories', {catItem:categorie, otherParams:nameCat})
  );
}

function buttonGeneration(gen, navigation){
  return(
    <TouchableOpacity onPress={() => clickGen(`${gen[4]}`, navigation)}>
    <View style={{borderWidth:3, borderRadius:20,margin:10, flexDirection:'row', flexGrow:4, justifyContent:'space-around', borderColor:'firebrick', backgroundColor:'crimson'}}>
        <View style={{flexDirection:'row', flex:1, justifyContent:'center', alignSelf:'center'}}>
          <Text style={{fontFamily:'Poppins-Bold', fontSize:20, color:'white'}}>{gen[3]}</Text>
        </View>
        <View style={{flexDirection:'row', margin:5}}>
          <Image style={{width:80, height:80, alignSelf:'center'}} source={{uri:`https://antimonarchical-ram.000webhostapp.com/miAPI/images/artwork/${gen[0]}.png`}} />
          <Image style={{width:80, height:80, alignSelf:'center'}} source={{uri:`https://antimonarchical-ram.000webhostapp.com/miAPI/images/artwork/${gen[1]}.png`}} />
          <Image style={{width:80, height:80, alignSelf:'center'}} source={{uri:`https://antimonarchical-ram.000webhostapp.com/miAPI/images/artwork/${gen[2]}.png`}} />
        </View>
    </View>
    </TouchableOpacity>
  );
}

function buttonItems(catItem, navigation, imageBtn){
  return(
    <TouchableOpacity onPress={() => clickCategories(`${catItem[1]}`, navigation, `${catItem[0]}`)}>
    <View style={{borderWidth:3, borderRadius:20,margin:10, flexDirection:'row', flexGrow:4, justifyContent:'space-around', borderColor:'lightsteelblue', backgroundColor:'aliceblue'}}>
        <View style={{flexDirection:'row', flex:1, justifyContent:'center', alignSelf:'center'}}>
          <Text style={{fontFamily:'Poppins-Bold', fontSize:20, color:'black'}}>{catItem[0]}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Image style={{width:230, height:60}} source={imageBtn} />
        </View>
    </View>
    </TouchableOpacity>
  );
}

function HomeScreen({ navigation }){
    //constantes para botones de generacion | Iniciales(3), nombre generacion, numero generacion
    const gen1 = [1, 4, 7, 'GEN I', 1];
    const gen2 = [152, 155, 158, 'GEN II', 2];
    const gen3 = [252, 255, 258, 'GEN III', 3];
    //constantes para botones de items | nombre categoria, id categoria segun API
    const pokeballItem = ['Pokeball', 3];
    const medicineItem = ['Medicine', 2];
    const mtmoItem = ['MT/MO', 1]

    return(
      <ScrollView>
        <View style={{margin:10, marginTop:0}}>
          <View>
            {/*Titulo de Generaciones pokemon*/}
            <View style={{margin:10}}>
                <Text style={{fontFamily:'Poppins-Bold',fontSize:18, color:'black'}}>POKEDEX</Text>
            </View>
            {/*Botones de Generaciones pokemon*/}
                {buttonGeneration(gen1, navigation)}
                {buttonGeneration(gen2, navigation)}
                {buttonGeneration(gen3, navigation)}
            <View style={{margin:10}}>
                  <Text style={{fontFamily:'Poppins-Bold',fontSize:18, color:'black'}}>ITEMS</Text>
            </View>
            {/*Botones de Items*/}
                {buttonItems(pokeballItem, navigation, PokeballsBtnImg)}
                {buttonItems(medicineItem, navigation)}
                {buttonItems(mtmoItem, navigation)}
          </View>
        </View>
      </ScrollView>
      );
  }

export default HomeScreen;
