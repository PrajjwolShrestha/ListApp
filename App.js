import { StatusBar } from 'expo-status-bar';
import React , {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

//create an app as a class
//export class and mark it as default 

export default class App extends Component{
  //render function is the main component inside the class
  render(){
    return(
      <SafeAreaView>

      </SafeAreaView>
    ) //returns view in brackets
  }
}

//create a stylesheet
const styles = StyleSheet.create({
  main: {
    paddingHorizontal:10,
  }
})
//stylesheet end




//Notes here---------------------------

/*

import safe area view

- reating an app where people can view list of data of something
- to implement that we need to add flatlist component
- have a look at the website

- flatlist has a function render item
- it also has component called item
- create a component first
- for that create a folder component
- inside that create js file named as Item.js



*/ 

//End of Notes ------------------------