/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';
import PostsView from './src/PostsView';
import MessageInput from './src/MessageInput';
import config from './src/config';

export const API_URL = 'http://207.154.202.86:8065/api/v3';
const WS_URL = 'ws://207.154.202.86:8065/api/v3/users/websocket';
const TEAM_ID = 'jcrhdjc18pdwjjia5zqrcfio4e';
const CHANNEL_ID = 'w6b49x9p4pr8ukokqgbjaki7rh';

const backgroundImage = require('./img/bg.png');

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
      loggedUser: null,
      message: '',
      posts: [],
      token: null,
    };
    this.handleSend = this.handleSend.bind(this);
  }

  componentDidMount() {
    fetch(`${API_URL}/users/login`, {
      method: 'POST',
      body: JSON.stringify({
        login_id: config.login_id,
        password: config.password,
      }),
    })
    .then((response) => {
      const token = response.headers.get('Token');
      this.setState({ token });

      const ws = new WebSocket(WS_URL);
      ws.onmessage = this.handleMessage.bind(this);
      ws.onopen = () => {
        // login user
        ws.send(JSON.stringify({
          seq: 1,
          action: 'authentication_challenge',
          data: {
            token,
          },
        }));
      };

      return response.json();
    })
    .then((response) => {
      this.setState({ loggedUser: response });
      this.getPosts();
    });
  }

  getPosts() {
    fetch(`${API_URL}/teams/${TEAM_ID}/channels/${CHANNEL_ID}/posts/page/0/60`, {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then(response => response.json())
      .then((response) => {
        const { order, posts } = response;
        const postsArray = [];
        for (let i = order.length - 1; i >= 0; i--) {
          const postId = order[i];
          postsArray.push(posts[postId]);
        }
        this.setState({ posts: postsArray });
      })
      .catch(error => console.log(error));
  }

  handleSend() {
    let message = this.state.message;
    if (message.length === 0) {
      message = 'Páčik';
    }
    fetch(`${API_URL}/teams/${TEAM_ID}/channels/${CHANNEL_ID}/posts/create`, {
      method: 'POST',
      body: JSON.stringify({
        channel_id: CHANNEL_ID,
        message,
      }),
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    }).then(() => this.setState({ message: '' }));
  }

  handleMessage(wsMessage) {
    const response = JSON.parse(wsMessage.data);
    if (response.event === 'posted') {
      // it's a message from someone
      const post = JSON.parse(response.data.post);
      const posts = [...this.state.posts, post];
      this.setState({ posts });
    }
  }

  render() {
    if (!this.state.loggedUser) {
      return <View><Text>Prihlasujem sa ...</Text></View>;
    }

    return (
      <Image
        source={backgroundImage}
        style={styles.container}
      >
        <PostsView posts={this.state.posts} loggedUserId={this.state.loggedUser.id} />
        <MessageInput
          message={this.state.message}
          onAction={this.handleSend}
          onChangeMessage={message => this.setState({ message })}
        />
      </Image>
    );
  }
}

AppRegistry.registerComponent('BeatChat', () => BeatChat);
