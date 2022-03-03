import React, { Component, useEffect, useState } from 'react';
import { Text, View  } from 'react-native';
import { colorPokemon } from '../../../utils.js';

class TypeBadge extends React.Component {
  render() {
    const {data} = this.props;
    return(
      <>
      {/*Tipos de pokemon*/}
      <View style={{margin:10, flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:20}}>
        {data['types'].map((type) =>
          <Text key={type.type.name} style={{fontSize:13,color:'white', backgroundColor:colorPokemon(type['type']['name']), borderRadius:15, margin:5, paddingLeft:8, paddingRight:8, textTransform:'capitalize', fontFamily:'Poppins-Bold'}}>{type['type']['name']}</Text>
        )}
      </View>
      </>
    )
  }
}

export default TypeBadge;
