/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  Navigator,
} from 'react-native';
import Header from '../components/Header';
import BackImg from '../img/back.png';
import UserCircleImg from '../img/user-circle.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { loggedUser: { nickname } } = this.props;
    return (
      <View style={styles.container}>
        <Header
          leftIcon={BackImg}
          onPressLeftAction={() => {
            this.props.navigator.pop();
          }}
          onPressRightAction={() => { }}
          title={'Môj profil'}
        />
        <Image style={styles.avatar} source={UserCircleImg} />
        <Text style={{ textAlign: 'center', fontSize: 24, marginBottom: 20 }}>{nickname}</Text>
        <Button
          onPress={() => { }}
          title="Change nickname"
        />
        <Button
          onPress={() => {
            this.props.navigator.push({
              name: 'login',
            });
          }}
          title="Log out"
        />
      </View>
    );
  }
}

Profile.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  loggedUser: PropTypes.objectOf({
    nickname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Profile;
