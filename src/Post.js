import React, { PropTypes } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet
} from 'react-native';
import { API_URL } from './../index.ios';

const userImageSize = 48;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
  message: {
    backgroundColor: 'transparent',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  userImage: {
    width: userImageSize,
    height: userImageSize,
    borderRadius: userImageSize / 2,
    overflow: 'hidden',
  },
});

const Post = ({ post, isMe }) => (
  <View style={[styles.container, { flexDirection: isMe ? 'row-reverse' : 'row' }]}>
    <Image source={{ uri: `${API_URL}/users/${post.user_id}/image` }} style={styles.userImage} />
    <Text
      style={[styles.message, {
        textAlign: isMe ? 'right' : 'left',
      }]}
      da
    >{post.message}</Text>
  </View >
);

Post.propTypes = {
  post: PropTypes.shape({
    user_id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  isMe: PropTypes.bool,
};

Post.defaultProps = {
  isMe: false,
};

export default Post;
