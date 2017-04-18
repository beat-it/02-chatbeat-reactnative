/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView,
  Image,
  ListView,
  View,
} from 'react-native';
import SendBird from 'sendbird';
import PostsView from '../components/PostsView';
import Header from '../components/Header';
import MessageInput from '../components/MessageInput';
import config from '../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const ChatView = Platform.select({
  ios: () => KeyboardAvoidingView,
  android: () => View,
})();

class Chat extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      message: '',
      postsDataSource: ds.cloneWithRows([]),
      posts: [],
      channel: null,
    };
    this.handleSend = this.handleSend.bind(this);
  }

  componentDidMount() {
    const { sb } = this.props;
    const ChannelHandler = new sb.ChannelHandler();

    ChannelHandler.onMessageReceived = this.handleMessage.bind(this);

    sb.addChannelHandler('handler', ChannelHandler);

    sb.OpenChannel.getChannel(this.props.params.channelUrl, (channel, error) => {
      console.log(this.props.params.channelUrl);
      if (error) {
        // @TODO implementovat nejaku hlasku
        console.error(error);
        return;
      }

      this.setState({ channel });

      const messageListQuery = channel.createPreviousMessageListQuery();

      messageListQuery.load(20, true, (messageList, error) => {
        if (error) {
          console.error(error);
          return;
        }
        //messageList.reverse();
        this.setState({
          posts: messageList,
          postsDataSource: this.state.postsDataSource.cloneWithRows(messageList)
        });
        console.log(messageList);
      });

      channel.enter((response, error) => {
        if (error) {
          // @TODO implementovat nejaku hlasku
          console.error(error);
        }
      });
    });
  }

  handleSend() {
    let message = this.state.message;
    if (message.length === 0) {
      message = 'Páčik';
    }

    this.state.channel.sendUserMessage(message, '', (messageObject, error) => {
      if (error) {
        // @TODO implementovat nejaku hlasku
        console.error(error);
        return;
      }

      // onSent
      console.log(messageObject);
      const posts = [messageObject, ...this.state.posts];
      this.setState({
        posts,
        postsDataSource: this.state.postsDataSource.cloneWithRows(posts),
        message: '',
      });
    });
  }

  handleMessage(channel, message) {
    if (message.messageType === 'user') {
      // it's a message from someone
      const posts = [message, ...this.state.posts];
      this.setState({
        posts,
        postsDataSource: this.state.postsDataSource.cloneWithRows(posts),
      });
    }
  }

  render() {
    if (!this.state.channel) {
      return <View><Text>Otvaram kanal ...</Text></View>;
    }

    return (
      <ChatView behavior="padding" style={styles.container}>
        <Header
          onPressLeftAction={() => {
            this.props.navigator.pop();
          }}
          title={this.state.channel.name}
          onPressRightAction={() => { }}
        />
        <PostsView dataSource={this.state.postsDataSource} loggedUserId={this.props.loggedUser.userId} />
        <MessageInput
          message={this.state.message}
          onAction={this.handleSend}
          onChangeMessage={message => this.setState({ message })}
        />
      </ChatView>
    );
  }
}

export default Chat;
