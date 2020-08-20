import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native'
// third-party components
import RNPickerSelect from 'react-native-picker-select'
// custom components
import { Item } from './components/Item'
// stylesheets
import {styles} from './styles/Main';
import {pickerStyle} from './styles/Picker';


//placeholder of the picker
const pickerPlaceholder = {
  label: 'Select status',
  value: null,
  color: 'black',
  
}

//using the class and this class extends Component
export default class App extends Component {
  //set initial state for different props
  state = {
    activityItem:'',
    activityStatus: '',
    validInput: false,
    showToast: false,
    message: '',
  }
  listData = [] //array

  //dropdown list items contains key ,value
  dropdownItems = [
    { label: 'Done', value: 'Done' },
    { label: 'Not Done', value: 'Not Done' },
    
  ]

  //render function that returns  views
  render() {
    return (
      <SafeAreaView style={{flex:1, position: 'relative'}}>
        <View style={styles.main}>
          <Text>Add Todo activities</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Todo Activity"
            

            //-------------------------
            
            onChangeText={ text =>
              this.setState({ activityItem: text }, () => {
                this.validate()
              })
            }
            
            //-------------------------
            ref={(input) => (this._textInput = input)}
          />
          
          <RNPickerSelect 
            items={this.dropdownItems}
            value={this.state.activityStatus}
            onValueChange={(value) =>
              this.setState({ activityStatus: value }, () => {
                this.validate()
              })
            }
            useNativeAndroidPickerStyle={false}
            style={pickerStyle}
            placeholder={pickerPlaceholder}
          />
          
        </View>
        {/* wrap the button in view */}
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={
              [
                this.state.validInput ? styles.button : styles.buttonDisabled,
                {borderRadius: 10}
              ]
            }
            onPress={this.addItem} //add item to the listData when button is pressed
            disabled={!this.state.validInput ? true : false}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={[{
          display: this.state.showToast ? 'flex' : 'none'
        }, styles.toast ]}>
          <Text style={styles.toastMessage}>{this.state.message}</Text>  
        </View>

        <View style={{flex:1}}>
          <FlatList
            data={this.listData}
            renderItem={this.renderList}
            keyExtractor={(item) => item.id}
            extraData={this.state.activityItem}
          />
        </View>
      </SafeAreaView>
    )
  }

  //function to load the list of data
  componentDidMount() {
    this.loadList()
  }

  //render the list
  renderList = ({ item }) => (
    <Item 
      activity={item.activity} 
      status={item.status} 
      id={item.id} 
      delete={ this.removeItem }
    />
  )

  //------------------------------------------------------

  //delete activities from the list

  removeItem = (itemId) => {
    this.listData.forEach( (item,index) => {
      if (item.id == itemId) {
        this.listData.splice( index, 1 )
      }
    } )
    this.showToast('Activity deleted', 2000 )
    this.saveList()
    this.setState({activityItem:0})
  }
  //------------------------------------------------------

  
  //add item to the list Data 
  addItem = () => {
    if (
      //isNaN(this.state.activityItem) ||
      this.state.activityItem == 0 ||
      this.state.activityItem == '' ||
      this.state.activityStatus == '' 
    ) {
      this.showToast('Activity could not be added',2000)
      return
    }
    let itemId = new Date().getTime().toString()
    let listItem = {
      id: itemId,
      activity: this.state.activityItem,
      status: this.state.activityStatus,
    }
    this.listData.push(listItem)
    // sort list in descending order
    this.sortList()
    this.saveList()
    this.setState({
      //activityItem: 0,
      activityItem:'',
      activityStatus: null,
      validInput: false,
    })
    this._textInput.clear() //clears the textinput
    this._textInput.focus() //set focus after the text has been cleared
    this.showToast('New Todo Activity Added', 1500 ) //display the message 
  }

  //function to validate the inputs
  validate = () => {
    if (this.state.activityItem  && this.state.activityStatus) {
      this.setState({ validInput: true })
    }
  }

  //sort list based on recently added data in the list
  //one that is added recently display first
  sortList = () => {
    this.listData.sort( (item1,item2) => {
      return item2.id - item1.id
    } )
  }

  //async storage saves data locally
  saveList = async () => {
    try {
      await AsyncStorage.setItem(
        'data',
        JSON.stringify(this.listData),
        console.log('item added')
      )
    }
    catch( error ) {
      console.log(error) //error message if saving is not successful
    }
  }

  //load the aync data using JSON
  loadList = async () => {
    try{
      let items = await AsyncStorage.getItem('data')
      if( JSON.parse(items) ) {
        this.listData = JSON.parse( items )
      }
      this.setState({activityItem:0})
    }
    catch(error) {
      console.log(error)
    }
  }

  //show toast message
  showToast = ( message, duration ) => {
    this.setState({message: message }, 
      () => { this.setState({showToast: true}) }
    )
    const timer = setTimeout( 
      () => { this.setState({showToast: false }) },
      duration 
    )
  }
}



