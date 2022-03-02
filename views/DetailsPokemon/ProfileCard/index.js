import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, Button, Alert, TouchableHighlight, ScrollView  } from 'react-native';
import { colorPokemon, setZero, editDesc} from '../../../utils.js';
import Title from '../Title';
import TypeBadge from '../TypeBadge';
import DetailsHW from '../DetailsHW';
import BaseStat from '../BaseStat';

class ProfileCard extends React.Component {
  render() {
    const {data, data2} = this.props;
    return(
      <>
      {/*Tarjeta de datos de pokemon*/}
      <View style={{marginTop:5, margin:10, backgroundColor:'white', borderRadius:10, flex:1}}>
          {/*Tipos de pokemon*/}
          <TypeBadge data={data} />
          {/*Titulo About*/}
          <Title data={data} text={'About'} />
              {/*Detalles de pokemon, peso, altura, y habilidades*/}
              <View style={{marginTop:-15 ,flex:3, flexDirection:'row', alignItems:'center'}}>
                    {/*Peso, con minúscula para que lo reconozca la API, se capitaliza en el componente*/}
                    <DetailsHW data={data} typeDetail={'weight'} />
                    {/*Altura, con minúscula para que lo reconozca la API, se capitaliza en el componente*/}
                    <DetailsHW data={data} typeDetail={'height'} />
                    {/*Habilidades // falta agregar titulo Abilities*/}
                    <View style={{flex:1}}>
                      <View style={{flexDirection:'column', alignItems:'center'}}>
                        {data['abilities'].map((type) =>
                          <Text key={type.ability.name} style={{fontFamily:'Poppins-Light' ,margin:1, textTransform:'capitalize'}}>{type['ability']['name']}</Text>
                        )}
                      </View>
                   </View>
              </View>
              {/*Descripcion de pokemon*/}
              <View style={{flex:1, flexDirection:'column', margin:10, alignItems:'center'}}>
                  <Text style={{fontFamily:'Poppins-Light', fontSize:13}}>{editDesc(data2['flavor_text_entries'][1]['flavor_text'])}</Text>
              </View>
          {/*Titulo Base Stats || Le mismo título pero con la funcion <Title /> <Title data={data} text={'Base Stats'} />*/}
          <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
              <Text style={{fontFamily:'Poppins-Bold',fontSize:18, color:colorPokemon(data['types'][0].type.name)}}>Base Stats</Text>
          </View>
                {/*Stats idStats= id de stat asignada por API, strStat= string para texto //Tal vez se prodria obtener las stats desde api y obtener estos datos desde ahí*/}
                {/*HP*/}
                <BaseStat data={data} idStat={0} strStat={'HP'} />
                {/*ATK*/}
                <BaseStat data={data} idStat={1} strStat={'ATK'} />
                {/*DEF*/}
                <BaseStat data={data} idStat={2} strStat={'DEF'} />
                {/*SATK*/}
                <BaseStat data={data} idStat={3} strStat={'SATK'} />
                {/*SDEF*/}
                <BaseStat data={data} idStat={4} strStat={'SDEF'} />
                {/*SPD*/}
                <BaseStat data={data} idStat={5} strStat={'SPD'} />
      </View>
      </>
    )
  }
}

export default ProfileCard;
