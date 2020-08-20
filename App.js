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

const pickerPlaceholder = {
  label: 'Select status',
  value: null,
  color: 'black',
  
}

export default class App extends Component {
  state = {
    //activityItem: 0,
    activityItem:'',
    activityStatus: '',
    validInput: false,
    showToast: false,
    message: '',
  }
  listData = []

  dropdownItems = [
    { label: 'Done', value: 'Done' },
    { label: 'Not Done', value: 'Not Done' },
    
  ]

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
            onPress={this.addItem}
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

  componentDidMount() {
    this.loadList()
  }

  renderList = ({ item }) => (
    <Item 
      activity={item.activity} 
      status={item.status} 
      id={item.id} 
      delete={ this.removeItem }
    />
  )

  //------------------------------------------------------
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
    this._textInput.clear()
    this._textInput.focus()
    this.showToast('New Todo Activity Added', 1500 )
  }

  validate = () => {
    if (this.state.activityItem  && this.state.activityStatus) {
      this.setState({ validInput: true })
    }
  }

  sortList = () => {
    this.listData.sort( (item1,item2) => {
      return item2.id - item1.id
    } )
  }

  saveList = async () => {
    try {
      await AsyncStorage.setItem(
        'data',
        JSON.stringify(this.listData),
        console.log('item added')
      )
    }
    catch( error ) {
      console.log(error)
    }
  }

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



