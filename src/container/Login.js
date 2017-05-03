import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  AsyncStorage,
  Button,
  Navigator,
  Alert,
} from 'react-native';
import SendBird from 'sendbird';
import CacheableImage from 'react-native-cacheable-image';
import ChatImg from '../img/chat.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  logoImg: {
    marginBottom: 20,
    marginTop: 120,
    width: 100,
    height: 100,
  },
  logo: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 60,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
});

const USER_ID_KEY = 'userid';
const USER_NICKNAME_KEY = 'nickname';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userid: '',
      nickname: '',
      loggingIn: false,
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  async componentWillMount() {
    try {
      const userid = await AsyncStorage.getItem(USER_ID_KEY);
      const nickname = await AsyncStorage.getItem(USER_NICKNAME_KEY);
      this.setState({ userid, nickname });
    } catch (e) {
      // probably not found, nevermind
    }
  }

  handleLogin() {
    const { sb, onChangeLoggedUser } = this.props;
    this.setState({ loggingIn: true });
    const userid = this.state.userid;
    const nickname = this.state.nickname;
    AsyncStorage.setItem(USER_ID_KEY, userid);
    AsyncStorage.setItem(USER_NICKNAME_KEY, nickname);
    sb.connect(userid, (user, error) => {
      if (error) {
        this.setState({ loggingIn: false });
        Alert.alert('Login failed, sorry.');
        return;
      }

      // update nickname if needed
      if (nickname !== user.nickname) {
        sb.updateCurrentUserInfo(nickname,
          user.profileUrl, (response, updateError) => {
            this.setState({ loggingIn: false });
            if (updateError) {
              Alert.alert('Failed to update profile');
            } else {
              onChangeLoggedUser(user);
              this.props.navigator.push({ name: 'openChannels' });
            }
          });
        return;
      }

      this.setState({ loggingIn: false });
      onChangeLoggedUser(user);
      this.props.navigator.push({ name: 'openChannels' });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <CacheableImage style={styles.logoImg} source={ChatImg} />
        <Text style={styles.logo}>ChatBeat</Text>
        {this.state.loggingIn
          ? <Text style={{ color: '#fff', fontSize: 20 }}>Logging in ...</Text>
          : <View style={{ alignSelf: 'stretch' }}>
            <TextInput
              autoCapitalize="none"
              placeholder="Your e-mail"
              keyboardType="email-address"
              autoCorrect={false}
              style={[styles.input, {
                marginBottom: 2,
              }]}
              onChangeText={userid => this.setState({ userid })}
              value={this.state.userid}
            />
            <TextInput
              autoCapitalize="none"
              placeholder="Nickname"
              returnKeyType="go"
              autoCorrect={false}
              style={[styles.input, {
                marginBottom: 20,
              }]}
              onChangeText={nickname => this.setState({ nickname })}
              value={this.state.nickname}
              onSubmitEditing={this.handleLogin}
            />
            <Button
              color={'#fff'}
              onPress={this.handleLogin}
              title="Let's go"
            />
          </View>}
      </View>
    );
  }
}

Login.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  sb: PropTypes.instanceOf(SendBird).isRequired,
  onChangeLoggedUser: PropTypes.func.isRequired,
};

export default Login;
