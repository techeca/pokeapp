import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, Button, Alert, TouchableHighlight, ScrollView  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './views/Home';
import Generation from './views/Generation';
import PokeDetail from './views/DetailsPokemon';
import Categories from './views/CategoriesItem';
import ListItem from './views/ListItem';

function PokeIconHome() {
  return (
    <View style={{flexDirection:'row'}}>
    <Image style={{ width: 35, height: 35, margin:5, marginLeft:0 }} source={require('./assets/pokeicow.png')}/>
    <Text style={{alignSelf:'center', fontFamily:'Poppins-Bold', fontSize:24, color:'white', marginLeft:10}}>Home</Text>
    </View>
  );
}

export default class App extends Component {
    render() {
    const Stack = createNativeStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{headerTitleStyle:{fontFamily:'Poppins-Bold'}, headerStyle:{backgroundColor:'crimson'}, headerTintColor:'white'}}>
          <Stack.Screen name='Home' component={Home} options={{headerTitle:(props) => <PokeIconHome {...props} />}}/>
          <Stack.Screen name='Generation' component={Generation} options={{headerTitleStyle:{fontFamily:'Poppins-Bold'}}} />
          <Stack.Screen name='Details' component={PokeDetail} options={{headerTitleStyle:{fontFamily:'Poppins-Bold'}}}/>
          <Stack.Screen name='Categories' component={Categories} options={{headerTitleStyle:{fontFamily:'Poppins-Bold'}}}/>
          <Stack.Screen name='List Items' component={ListItem} options={{headerTitleStyle:{fontFamily:'Poppins-Bold'}}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};
