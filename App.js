import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, Button, Alert, TouchableHighlight, ScrollView  } from 'react-native';
import PokeIco from './recursos/pokeico.png';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home.js';
import PkmnList from './PkmnList.js';
import PokeDetail from './DetailsPkmn.js'

function clickPkmn(pkmn, navigation){
    return(
      navigation.navigate('Details', {itemID:pkmn.numerodex, otherParams: pkmn})
      );
  }

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }

  async getPkmn() {
    try {
      const response = await fetch('https://antimonarchical-ram.000webhostapp.com/miAPI/api.php');
      const json = await response.json();
      this.setState({ data: json });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.getPkmn();
  }

  render() {
    const { data, isLoading } = this.state;
    const Stack = createNativeStackNavigator();

    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} options={{headerTitleStyle:{fontFamily:'Poppins-Bold'}}}/>
        <Stack.Screen name='Pkmn List' component={PkmnList} options={{headerTitleStyle:{fontFamily:'Poppins-Bold'}}} />
        <Stack.Screen name='Details' component={PokeDetail} options={{headerTitleStyle:{fontFamily:'Poppins-Bold'}}}/>
      </Stack.Navigator>
      </NavigationContainer>
    );
  }
};
