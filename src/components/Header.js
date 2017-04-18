import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Image,
  StatusBar,
} from 'react-native';
import ImageButton from './ImageButton';
import backIcon from '../img/back.png';

const styles = StyleSheet.create({
  container: {
    //borderBottomWidth: StyleSheet.hairlineWidth,
    //borderBottomColor: 'rgba(255,255,255,.5)',
    //position: 'absolute',
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    right: 0,
    zIndex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingTop: 30,
    //marginTop: 20,
    //backgroundColor: 'rgba(0,0,0,0.2)',
    //backgroundColor: 'rgba(0,0,0,0.2)',
    //backgroundColor: '#FE4100',
    //backgroundColor: 'rgba(255,255,255,.5)',
    backgroundColor: '#FF7A31',
  },
});

const Header = (props) => (
  <View blurRadius={1} style={styles.container}>
    <ImageButton
      onPress={props.onPressLeftAction}
      image={backIcon}
    />
    <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center', flex: 1, fontSize: 18 }}>{props.title}</Text>
    <ImageButton
      onPress={props.onPressRightAction}
      image={backIcon}
    />
  </View>
);

export default Header;
