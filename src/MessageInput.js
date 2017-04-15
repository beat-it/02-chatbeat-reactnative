import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,.5)',
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
    color: '#000',
  },
  input: {
    height: 26,
    flex: 1,
    fontSize: 13,
    padding: 4,
  },
});

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
    };
    this.onChangeMessage = this.props.onChangeMessage.bind(this);
    this.onAction = this.props.onAction.bind(this);
  }

  render() {
    const { message } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            placeholder="Napíš niečo ..."
            enablesReturnKeyAutomatically
            returnKeyType="done"
            multiline
            onChangeText={this.onChangeMessage}
            onContentSizeChange={(event) => {
              this.setState({ height: event.nativeEvent.contentSize.height });
            }}
            style={[styles.input, { height: Math.max(0, this.state.height), flex: 1 }]}
            value={message}
          />
          <TouchableOpacity activeOpacity={0.4} style={styles.actionButton} onPress={this.onAction}>
            {this.props.message
              ? <Text style={styles.actionButtonContent}>Poslať</Text>
              : <Text style={styles.actionButtonContent}>Páčik</Text>}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

MessageInput.propTypes = {
  onChangeMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
};

export default MessageInput;
