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
  Navigator,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SendBird from 'sendbird';
import Header from '../components/Header';
import UserImg from '../img/user.png';
import PlusImg from '../img/plus.png';

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
          leftIcon={UserImg}
          rightIcon={PlusImg}
          onPressLeftAction={() => {
            this.props.navigator.push({
              name: 'profile',
            });
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

OpenChannels.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  sb: PropTypes.instanceOf(SendBird).isRequired,
};

export default OpenChannels;

const coverImageSize = 48;

const ListItem = props => (
  <TouchableOpacity onPress={() => { props.onPressChannel(); }} activeOpacity={0.5}>
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
        }}
        source={{ uri: props.image }}
      />
      <Text
        style={{
          fontSize: 18,
        }}
      >{props.title}</Text>
    </View>
  </TouchableOpacity>
);

ListItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onPressChannel: PropTypes.func.isRequired,
};
