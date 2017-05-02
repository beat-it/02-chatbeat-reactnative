import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, Image, View } from 'react-native';

class ImageButton extends Component {
  constructor(props) {
    super(props);
    this.style = this.props.style;
  }
  render() {
    return (
      <TouchableHighlight
        style={this.props.buttonStyle}
        onPress={this.props.onPress}
      >
        <Image style={{ width: 30, height: 30 }} source={this.props.image} />
      </TouchableHighlight>
    );
  }
}

ImageButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  buttonStyle: View.propTypes.style,
  style: View.propTypes.style,
  image: Image.propTypes.source.isRequired,
};

ImageButton.defaultProps = {
  buttonStyle: {},
  style: {},
};

export default ImageButton;
