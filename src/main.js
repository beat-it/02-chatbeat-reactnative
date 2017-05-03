import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
  StatusBar,
} from 'react-native';
import SendBird from 'sendbird';
import CacheableImage from 'react-native-cacheable-image';
import config from './config';
import routes from './routes';
import BackgroundImage from './img/background.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sb: new SendBird({ appId: config.sendbird_app_id }),
      loggedUser: null,
    };
  }

  render() {
    return (
      <CacheableImage
        source={BackgroundImage}
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
      </CacheableImage>
    );
  }
}
