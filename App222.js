import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, Button, Alert, TouchableHighlight  } from 'react-native';
import PokeIco from './recursos/pokeico.png';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function clickPkmn(pkmn){

    return(
      alert(
          `Pokemon seleccionado:${pkmn.nombre}`,
          [
            {
              text: 'Cancel',
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        )
      );
    }

function replaceChar(strBase, txtChang, txtNew){
  return strBase.replace(`${txtChang}`, `${txtNew}`);
}

    function HomeScreen({ navigation }){
      return(
        <PruebaHome />
        );
    }

    function DetailsScreen({ navigation }){
      return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => navigation.push('Details')}
        />
      </View>
    );
    }

    const Stack = createNativeStackNavigator();


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
      <>
      <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='POKEDEX' component={HomeScreen} />
        <Stack.Screen name='Details' component={DetailsScreen} />
      </Stack.Navigator>
      </NavigationContainer>
      <View style={{margin:10}}>
        <FlatList
          numColumns='3'
          data={data}
          renderItem={({item}) => (

            <TouchableHighlight onPress={() => clickPkmn(item)} style={{flex:1, width:'100%'}}>
            <View key={item.numerodex} style={{flex:1, borderWidth:2 ,borderRadius:10 ,backgroundColor:'', margin: 5, width:'90%'}}>
                <View style={{ backgroundColor:'', alignSelf:'flex-end'}}>
                  <Text style={{color:'black', marginRight:3}}>#{item.numerodex}</Text>
                </View>
                <Image style={{width:100, height:100, alignSelf:'center'}}
                     source={{uri:`${item.imagen}`}} />
                <View style={{ borderTopWidth:2, width:'100%'}}>
                  <Text style={{color:'black', alignSelf:'center', marginBottom:3}}>{item.nombre}</Text>
                </View>
            </View>
            </TouchableHighlight >
            )}
        />
        <View>
          <Text>holi :p</Text>
        </View>
      </View>
      </>
    );
  }
};
