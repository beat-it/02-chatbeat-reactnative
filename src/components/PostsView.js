import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View,
  ListView,
} from 'react-native';
import Post from './Post';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class PostsView extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.scrollViewComponent = null;
  }

  render() {
    const { dataSource, loggedUserId, onLoadMore } = this.props;
    return (
      <View style={[styles.container, { transform: [{ scaleY: -1 }] }]}>
        <ListView
          ref={(el) => { this.scrollViewComponent = el; }}
          enableEmptySections
          onEndReached={() => { onLoadMore(); }}
          onEndReachedThreshold={40}
          dataSource={dataSource}
          renderRow={post => (
            <Post
              key={post.messageId}
              post={post}
              isMe={post._sender.userId === loggedUserId}
            />
          )}
        />
      </View>
    );
  }
}

PostsView.propTypes = {
  loggedUserId: PropTypes.string.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  dataSource: PropTypes.instanceOf(ListView.DataSource).isRequired,
};

export default PostsView;
