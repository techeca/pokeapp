import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { colorPokemon, capitalizeFirst } from '../../../utils.js';

class DetailsHW extends React.Component {
  render() {
    const {data, typeDetail} = this.props;
    return(
      <>
      {/*Tipos de pokemon*/}
      <View style={{flex:1}}>
          <View style={{flexDirection:'column', alignItems:'center'}}>
              <View>
                <Text style={{fontFamily:'Poppins-Light'}}>{data[`${typeDetail}`]}</Text>
              </View>
              <View>
                <Text style={{fontFamily:'Poppins-Light'}}>{capitalizeFirst(typeDetail)}</Text>
              </View>
          </View>
      </View>
      </>
    )
  }
}

export default DetailsHW;
