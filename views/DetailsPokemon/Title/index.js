import React, { Component } from 'react';
import { Text, View  } from 'react-native';
import { colorPokemon } from '../../../utils.js';

class Title extends React.Component {
  render() {
    const {data, text} = this.props;
    return(
      <>
      {/*Titulo*/}
      <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontFamily:'Poppins-Bold',fontSize:18, color:colorPokemon(data['types'][0].type.name)}}>{text}</Text>
      </View>
      </>
    )
  }
}

export default Title;
