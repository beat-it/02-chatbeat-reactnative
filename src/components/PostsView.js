import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  ListView,
} from 'react-native';
import Post from './Post';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'flex-end',
  },
});

class PostsView extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.scrollViewComponent = null;
  }

  render() {
    const { dataSource, loggedUserId } = this.props;
    return (
      <View style={[styles.container, { transform: [{ scaleY: -1 }] }]}>
        <ListView
          ref={(el) => { this.scrollViewComponent = el; }}
          enableEmptySections
          onEndReached={() => { }}
          onEndReachedThreshold={40}
          dataSource={dataSource}
          renderRow={post => <Post key={post.messageId} post={post} isMe={post._sender.userId === loggedUserId} />}
        />
      </View>
    );
  }
}

PostsView.propTypes = {
  //posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  loggedUserId: PropTypes.string.isRequired,
};

export default PostsView;
