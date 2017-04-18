/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
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

class OpenChannels extends Component {

  constructor(props) {
    super(props);
    this.state = {
      channels: [],
    };
  }

  componentDidMount() {
    const { sb } = this.props;

    const openChannelListQuery = sb.OpenChannel.createOpenChannelListQuery();
    openChannelListQuery.next((channels, error) => {
      if (error) {
        console.log(error);
        return;
      }

      this.setState({ channels });
      console.log(channels);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          onPressLeftAction={() => {
            this.props.navigator.pop();
          }}
          onPressRightAction={() => { }}
          title={'Zoznam kanálov'}
        />
        <ScrollView>
          {this.state.channels.map(item => <ListItem
            key={item.url}
            onPressChannel={() => {
              this.props.navigator.push({
                name: 'chat',
                params: {
                  channelUrl: item.url,
                },
              });
            }}
            image={item.coverUrl}
            title={item.name}
          />)}
        </ScrollView>
      </View>
    );
  }
}

export default OpenChannels;

const coverImageSize = 48;

const ListItem = (props) => (
  <TouchableOpacity onPress={() => { props.onPressChannel(props.item); }} activeOpacity={0.5}>
    <View
      style={{
        borderBottomColor: '#dbdbdb',
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Image
        style={{
          width: coverImageSize,
          height: coverImageSize,
          borderRadius: coverImageSize / 2,
          overflow: 'hidden',
          marginRight: 10,
        }} source={{ uri: props.image }} />
      <Text style={{
        fontSize: 18,
      }}>{props.title}</Text>
    </View>
  </TouchableOpacity>
);
