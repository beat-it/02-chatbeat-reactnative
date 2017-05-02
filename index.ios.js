/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  StatusBar,
  Image,
} from 'react-native';
import SendBird from 'sendbird';
import config from './src/config';
import routes from './src/routes';


const backgroundImage = require('./src/img/background.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});

export default class BeatChat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sb: new SendBird({ appId: config.sendbird_app_id }),
      loggedUser: null,
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <Image
        source={backgroundImage}
        style={styles.container}
      >
        <StatusBar
          barStyle="light-content"
        />
        <Navigator
          initialRoute={{ name: 'login' }}
          renderScene={(route, navigator) => {
            let params = {};
            if (route.params) {
              params = route.params;
            }
            const Container = routes[route.name];
            return (
              <Container
                route={route}
                navigator={navigator}
                sb={this.state.sb}
                loggedUser={this.state.loggedUser}
                onChangeLoggedUser={loggedUser => this.setState({ loggedUser })}
                params={params}
              />
            );
          }}
          configureScene={() => Navigator.SceneConfigs.FloatFromRight}
          style={styles.container}
        />
      </Image>
    );
  }
}

AppRegistry.registerComponent('BeatChat', () => BeatChat);
