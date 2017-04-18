import React, { Component } from 'react';
import { TouchableHighlight, Image } from 'react-native';

export default class ImageButton extends Component {
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
