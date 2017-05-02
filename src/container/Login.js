import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  AsyncStorage,
  Button,
  Image,
  Navigator,
  Alert,
} from 'react-native';
import SendBird from 'sendbird';
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
    marginBottom: 20,
  },
});

const USER_ID_KEY = 'userid';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userid: '',
      loggingIn: false,
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  async componentWillMount() {
    try {
      const userid = await AsyncStorage.getItem(USER_ID_KEY);
      this.setState({ userid });
    } catch (e) {
      // probably not found, nevermind
    }
  }

  handleLogin() {
    const { sb, onChangeLoggedUser } = this.props;
    this.setState({ loggingIn: true });
    const userid = this.state.userid;
    AsyncStorage.setItem(USER_ID_KEY, userid);
    sb.connect(userid, (user, error) => {
      this.setState({ loggingIn: false });
      if (error) {
        Alert.alert('Login failed, sorry.');
      } else {
        onChangeLoggedUser(user);
        this.props.navigator.push({ name: 'openChannels' });
      }
    });

    // if (this.state.nickname !== this.props.loggedUser.nickname) {
    //   this.props.sb.updateCurrentUserInfo(this.state.nickname,
    // this.props.loggedUser.profileUrl, (response, error) => {
    //     if (error) {
    //       // @TODO implementovat nejaku hlasku
    //       console.error(error);
    //     }

    //     this.props.navigator.push({ name: 'openChannels' });
    //   });
    // } else {
    //   this.props.navigator.push({ name: 'openChannels' });
    // }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logoImg} source={ChatImg} />
        <Text style={styles.logo}>ChatBeat</Text>
        {this.state.loggingIn
          ? <Text style={{ color: '#fff', fontSize: 20 }}>Logging in ...</Text>
          : <View style={{ alignSelf: 'stretch' }}>
            <TextInput
              autoCapitalize="none"
              placeholder="Your e-mail"
              keyboardType="email-address"
              returnKeyType="go"
              autoCorrect={false}
              style={styles.input}
              onChangeText={userid => this.setState({ userid })}
              value={this.state.userid}
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
