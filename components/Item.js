import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image} from 'react-native';

//use touchable opacity as a button instead of using button

//create a function
export const Item = (props) => {
    //return a view for Item
    return (
        <View style={itemStyles.item}>
            <View style={itemStyles.row}>
                <Text style={itemStyles.text}>{props.category}</Text>
                <Text style={itemStyles.text}>{props.amount}</Text>
            </View>

            <TouchableOpacity>
                <Image style={itemStyles.icon} source={require('../assets/trash-alt-solid.png')}/>  
            </TouchableOpacity>
        </View>
    )
}


//styles

const itemStyles = StyleSheet.create({
    item:{
        padding:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    text:{
        fontSize:16,
        color:'black'
    },
    row:{
        flexDirection:'row',
        flex:1,
        justifyContent:'space-between',
        paddingRight:10,
    },
    icon:{
        width:20,
        height:20,
    }

})

/*

*/