import React from 'react';
import {Text,View,StyleSheet} from 'react-native';


//create a function
export const Item = (props) => {
    //return a view for Item
    return (
        <View style={itemStyles.item}>
            <Text style={itemStyles.text}>{props.category}</Text>
            <Text style={itemStyles.text}>{props.amount}</Text>
        </View>
    )
}


//styles

const itemStyles = StyleSheet.create({
    item:{
        padding:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    text:{
        fontSize:16,
        color:'black'
    }
})

/*

*/