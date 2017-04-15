import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import Post from './Post';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

class PostsView extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.scrollViewComponent = null;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.posts.length !== this.props.posts.length) {
      setTimeout(() => {
        this.scrollViewComponent.scrollToEnd({ animate: true });
      }, 0);
    }
  }

  render() {
    const { posts, loggedUserId } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView ref={(el) => { this.scrollViewComponent = el; }}>
          {posts.map(post => (
            <Post key={post.id} post={post} isMe={post.user_id === loggedUserId} />
          ))}
        </ScrollView>
      </View>
    );
  }
}

PostsView.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  loggedUserId: PropTypes.string.isRequired,
};

export default PostsView;
