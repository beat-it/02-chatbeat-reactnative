import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  Navigator,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import SendBird from 'sendbird';
import CacheableImage from 'react-native-cacheable-image';
import Header from '../components/Header';
import LogoutImg from '../img/logout.png';

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
        Alert.alert('Failed to list channels');
        return;
      }

      this.setState({ channels });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftIcon={LogoutImg}
          onPressLeftAction={() => {
            this.props.navigator.push({
              name: 'login',
            });
          }}
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
            subtitle={item.participantCount}
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
      <CacheableImage
        style={{
          width: coverImageSize,
          height: coverImageSize,
          borderRadius: coverImageSize / 2,
          overflow: 'hidden',
          marginRight: 10,
        }}
        key={props.image}
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
