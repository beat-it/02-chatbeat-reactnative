import React, { PropTypes } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet
} from 'react-native';

const userImageSize = 48;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
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
  <View style={[styles.container, { transform: [{ scaleY: -1 }], flexDirection: isMe ? 'row-reverse' : 'row' }]}>
    <Image source={{ uri: post._sender.profileUrl }} style={styles.userImage} />
    {post.messageType === 'user'
      && <Text
        style={[styles.message, {
          textAlign: isMe ? 'right' : 'left',
          fontSize: post.message === '👍' ? 36 : 14,
        }]}
      >{post.message}</Text>}
    {post.messageType === 'file'
      && <Image
        source={{ uri: post.url }}
        style={{
          width: 100,
          height: 70,
        }}
      />}
  </View >
);

Post.propTypes = {
  post: PropTypes.shape({
    _sender: PropTypes.shape({
      profileUrl: PropTypes.string,
    }),
    message: PropTypes.string,
  }).isRequired,
  isMe: PropTypes.bool,
};

Post.defaultProps = {
  isMe: false,
};

export default Post;
