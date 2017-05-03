import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Navigator,
  Text,
  Platform,
  KeyboardAvoidingView,
  Alert,
  ListView,
  View,
} from 'react-native';
import SendBird from 'sendbird';
import ImagePicker from 'react-native-image-picker';
import PostsView from '../components/PostsView';
import Header from '../components/Header';
import MessageInput from '../components/MessageInput';
import BackImg from '../img/back.png';

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
      messageListQuery: null,
      posts: [],
      channel: null,
    };
    this.handleSend = this.handleSend.bind(this);
    this.handleSendFile = this.handleSendFile.bind(this);
  }

  componentDidMount() {
    const { sb } = this.props;
    const ChannelHandler = new sb.ChannelHandler();

    ChannelHandler.onMessageReceived = this.handleMessage.bind(this);

    sb.addChannelHandler('handler', ChannelHandler);

    sb.OpenChannel.getChannel(this.props.params.channelUrl, (channel, channelError) => {
      if (channelError) {
        Alert.alert('Failed to open the channel');
        return;
      }

      this.setState({ channel }, () => {
        this.loadMessages(true);
      });

      channel.enter((response, error) => {
        if (error) {
          Alert.alert('Failed to enter the channel');
        }
      });
    });
  }

  loadMessages(refresh) {
    let messageListQuery = this.state.messageListQuery;

    if (refresh) {
      messageListQuery = this.state.channel.createPreviousMessageListQuery();
      this.setState({ messageListQuery, posts: [] });
    }

    messageListQuery.load(20, true, (messageList, error) => {
      if (error) {
        Alert.alert('Failed to fetch messages');
        return;
      }

      const posts = [...this.state.posts, ...messageList];

      this.setState({
        posts,
        postsDataSource: this.state.postsDataSource.cloneWithRows(posts),
      });
    });
  }

  handleSend() {
    let message = this.state.message;
    if (message.length === 0) {
      message = '👍';
    }

    this.state.channel.sendUserMessage(message, '', (messageObject, error) => {
      if (error) {
        Alert.alert('Failed to send text message');
        return;
      }

      // onSent
      const posts = [messageObject, ...this.state.posts];
      this.setState({
        posts,
        postsDataSource: this.state.postsDataSource.cloneWithRows(posts),
        message: '',
      });
    });
  }

  handleSendFile() {
    ImagePicker.showImagePicker({
      title: 'Select Image File To Send',
      mediaType: 'photo',
      takePhotoButtonTitle: null,
      noData: true,
    }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        if (response.name) {
          source.name = response.fileName;
        } else {
          const paths = response.uri.split('/');
          source.name = paths[paths.length - 1];
        }

        if (response.type) {
          source.type = response.type;
        }

        this.state.channel.sendFileMessage(source, (messageObject, error) => {
          if (error) {
            Alert.alert('Failed to send file');
            return;
          }

          const posts = [messageObject, ...this.state.posts];
          this.setState({
            posts,
            postsDataSource: this.state.postsDataSource.cloneWithRows(posts),
          });
        });
      }
    });
  }

  handleMessage(channel, message) {
    // it's a message from someone
    const posts = [message, ...this.state.posts];
    this.setState({
      posts,
      postsDataSource: this.state.postsDataSource.cloneWithRows(posts),
    });
  }

  render() {
    if (!this.state.channel) {
      return <View><Text>Opening channel ...</Text></View>;
    }

    return (
      <ChatView behavior="padding" style={styles.container}>
        <Header
          leftIcon={BackImg}
          onPressLeftAction={() => {
            this.props.navigator.pop();
          }}
          title={this.state.channel.name}
        />
        <PostsView
          dataSource={this.state.postsDataSource}
          loggedUserId={this.props.loggedUser.userId}
          onLoadMore={() => { this.loadMessages(false); }}
        />
        <MessageInput
          message={this.state.message}
          onAction={this.handleSend}
          onChangeMessage={message => this.setState({ message })}
          onPressPhoto={this.handleSendFile}
        />
      </ChatView>
    );
  }
}

Chat.propTypes = {
  loggedUser: PropTypes.shape({
    userId: PropTypes.string.isRequired,
  }).isRequired,
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  sb: PropTypes.instanceOf(SendBird).isRequired,
  params: PropTypes.shape({
    channelUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default Chat;
