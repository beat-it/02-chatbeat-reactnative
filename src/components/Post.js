import React, { PropTypes } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import CacheableImage from 'react-native-cacheable-image';

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
  },
  userImage: {
    width: userImageSize,
    height: userImageSize,
    borderRadius: userImageSize / 2,
    overflow: 'hidden',
  },
  sender: {
    fontSize: 10,
    color: '#555',
  },
});

const Post = ({ post, isMe }) => (
  <View style={[styles.container, { transform: [{ scaleY: -1 }], flexDirection: isMe ? 'row-reverse' : 'row' }]}>
    <CacheableImage
      source={{ uri: post._sender.profileUrl }}
      key={post._sender.profileUrl}
      style={styles.userImage}
    />

    <View style={{ marginHorizontal: 10 }}>
      <Text
        style={[styles.sender, {
          textAlign: isMe ? 'right' : 'left',
        }]}
      >{post._sender.nickname}</Text>
      {post.messageType === 'user'
        && <Text
          style={[styles.message, {
            textAlign: isMe ? 'right' : 'left',
            fontSize: post.message === '👍' ? 36 : 14,
          }]}
        >{post.message}</Text>
      }
      {post.messageType === 'file'
        && <CacheableImage
          style={{
            width: 100,
            height: 70,
          }} key={post.url} source={{ uri: post.url }}
        />
      }
    </View>
  </View >
);

Post.propTypes = {
  post: PropTypes.shape({
    _sender: PropTypes.shape({
      nickname: PropTypes.string,
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
