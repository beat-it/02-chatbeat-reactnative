import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 16,
  },
});

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.loggedUser.nickname,
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    if (this.state.nickname !== this.props.loggedUser.nickname) {
      this.props.sb.updateCurrentUserInfo(this.state.nickname, this.props.loggedUser.profileUrl, (response, error) => {
        if (error) {
          // @TODO implementovat nejaku hlasku
          console.error(error);
        }

        this.props.navigator.push({ name: 'openChannels' });
      });
    } else {
      this.props.navigator.push({ name: 'openChannels' });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ nickname: text })}
          value={this.state.nickname}
        />
        <Button
          color={'#333'}
          onPress={this.handleLogin}
          title="Let's go"
        />
      </View>
    );
  }
}

// Login.propTypes = {
//   navigator
// }

export default Login;
