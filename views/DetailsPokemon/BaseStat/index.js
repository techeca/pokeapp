import React, { Component, useEffect, useState } from 'react';
import { Text, View  } from 'react-native';
import { colorPokemon } from '../../../utils.js';

class TypeBadge extends React.Component {
  render() {
    const {data, idStat, strStat} = this.props;
    return(
      <>
      {/*Base Stat*/}
      <View style={{marginBottom:0, flex:1, flexDirection:'row'}}>
          <View style={{flex:2, flexDirection:'row', justifyContent:'flex-end'}}>
              <Text style={{fontFamily:'Poppins-Bold', color:colorPokemon(data['types'][0].type.name), marginRight:30, marginTop:-8}}>{strStat}</Text>
          </View>
          <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
              <Text style={{fontSize:16, marginTop:-8}}>{data['stats'][`${idStat}`]['base_stat']}</Text>
          </View>
          <View style={{flex:4,backgroundColor:'whitesmoke',height:7, marginRight:30, borderRadius:10, flexDirection:'row', justifyContent:'flex-start'}}>
              <View style={{backgroundColor:colorPokemon(data['types'][0].type.name),width:`${data['stats'][`${idStat}`]['base_stat']}%`, borderRadius:10}}></View>
          </View>
      </View>
      </>
    )
  }
}

export default TypeBadge;
