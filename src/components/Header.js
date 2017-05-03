import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ImageButton from './ImageButton';

const styles = StyleSheet.create({
  container: {
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    right: 0,
    zIndex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingTop: 30,
    backgroundColor: '#FF7A31',
  },
});

const Header = props => (
  <View style={styles.container}>
    <ImageButton
      onPress={props.onPressLeftAction}
      image={props.leftIcon}
    />
    <Text
      style={{
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        fontSize: 18,
      }}
    >{props.title}</Text>
    <ImageButton
      onPress={props.onPressRightAction}
      image={props.rightIcon}
    />
  </View>
);

Header.propTypes = {
  title: PropTypes.node.isRequired,
  leftIcon: PropTypes.number,
  rightIcon: PropTypes.number,
  onPressLeftAction: PropTypes.func,
  onPressRightAction: PropTypes.func,
};

Header.defaultProps = {
  leftIcon: 0,
  rightIcon: 0,
  onPressLeftAction: () => { },
  onPressRightAction: () => { },
};

export default Header;
