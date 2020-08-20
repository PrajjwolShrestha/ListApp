import React from 'react';
import { Text,View,TouchableOpacity,Image } from 'react-native';

import {itemStyles} from '../styles/Item';

export const Item = ( props ) => {
  return(
    <View style={itemStyles.item}>
      <View style={itemStyles.row}>
        <Text style={itemStyles.text}>{props.activity}</Text>
        <Text style={itemStyles.text}>{props.status}</Text>

      </View>
      <TouchableOpacity onPress={ () => {props.delete( props.id ) } }>
        <Image style={itemStyles.icon} source={require('../assets/trash-alt-solid.png')} />
      </TouchableOpacity>
    </View>
  )
}
