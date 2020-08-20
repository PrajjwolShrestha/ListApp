import {StyleSheet} from 'react-native';
import {colors} from './Colors';

export const itemStyles = StyleSheet.create({
  item : {
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    color: 'black',
    flex:1,
    paddingLeft:10,
    paddingRight:10,
    borderWidth:1,
    borderColor:'black',
    backgroundColor:'lightgreen'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
})