import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import ImageButton from '../components/ImageButton';
import LikeImg from '../img/like.png';

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#dbdbdb',
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  actionButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginLeft: 5,
  },
  actionButtonContent: {
    color: '#FF7A31',
  },
  input: {
    height: 26,
    flex: 1,
    fontSize: 13,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderColor: '#FF7A31',
    borderWidth: 1,
    borderRadius: 4,
  },
});

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
    };
    this.onChangeMessage = this.props.onChangeMessage.bind(this);
    this.onPressPhoto = this.props.onPressPhoto.bind(this);
    this.onAction = this.props.onAction.bind(this);
  }

  render() {
    const { message } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ImageButton
            onPress={this.onPressPhoto}
            image={LikeImg}
          />
          <TextInput
            autoCorrect={false}
            placeholder="Napíš niečo ..."
            enablesReturnKeyAutomatically
            returnKeyType="done"
            multiline
            onChangeText={this.onChangeMessage}
            onContentSizeChange={(event) => {
              this.setState({ height: event.nativeEvent.contentSize.height });
            }}
            style={[styles.input, { height: Math.min(50, this.state.height), flex: 1 }]}
            value={message}
          />
          <TouchableOpacity activeOpacity={0.4} style={styles.actionButton} onPress={this.onAction}>
            {this.props.message
              ? <Text style={styles.actionButtonContent}>Poslať</Text>
              : <ImageButton
                onPress={this.onAction}
                image={LikeImg}
              />}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

MessageInput.propTypes = {
  onChangeMessage: PropTypes.func.isRequired,
  onPressPhoto: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
};

export default MessageInput;
