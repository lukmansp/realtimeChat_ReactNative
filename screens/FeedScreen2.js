import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  LayoutAnimation,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import Fire from '../Fire';
posts = [
  {
    id: 1,
    name: 'Iyea',
    text: 'hari ini hari peringatan corona sedunia',
    timestamp: '1585112809239',
    avatar: require('../images/account.png'),
    image: require('../images/conversation.png'),
  },
  {
    id: 1,
    name: 'Momon',
    text: 'hari ini hari peringatan corona sedunia',
    timestamp: '1585112809239',
    avatar: require('../images/account.png'),
    image: require('../images/conversation.png'),
  },
  {
    id: 1,
    name: 'jadbed',
    text: 'hholiday',
    timestamp: '1569109273726',
    avatar: require('../images/account.png'),
    image: require('../images/conversation.png'),
  },
];
export default class FeedScreen extends React.Component {
  renderPost = post => {
    return (
      <View style={styles.feedItem}>
        <View style={{marginHorizontal: 32, marginTop: 32, height: 150}}>
          <Image style={{width: '100%', height: '100%'}}></Image>
        </View>
        <Image source={post.avatar} style={styles.avatar} />
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={styles.name}>{post.name}</Text>
              <Text style={styles.timestamp}>
                {moment(post.timestamp).fromNow()}
              </Text>
            </View>
            <Icon name="angle-down" size={24} color="#737888" />
          </View>
          <Text style={styles.post}>{post.text}</Text>
          <Image
            source={post.image}
            style={styles.postImage}
            resizeMode="cover"
          />
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="heart"
              size={24}
              color="#73788b"
              style={{marginRight: 16}}
            />
            <Icon name="rocketchat" size={24} color="#73788b" />
          </View>
        </View>
      </View>
    );
  };

  render() {
    LayoutAnimation.easeInEaseOut;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Feed</Text>
        </View>
        <View style={styles.inputContainer}>
          <Image
            source={require('../images/account.png')}
            style={styles.avatar}
          />
          <TextInput
            autoFocus={true}
            multiline={true}
            numberOfLines={1}
            style={styles.textFeed}
            placeholder="share someting?"></TextInput>
        </View>
        <TouchableOpacity style={styles.photo} onPress={this.handleChoosePhoto}>
          <Icon name="camera" size={32} color="#D8D9Db" />
        </TouchableOpacity>
        <FlatList
          style={styles.feed}
          data={posts}
          renderItem={({item}) => this.renderPost(item)}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textFeed: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#EFECF4',
  },
  header: {
    paddingTop: 4,
    paddingBottom: 16,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EBECF4',
    shadowColor: '#454D65',
    shadowOffset: {height: 5},
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: '#454D65',
  },
  timestamp: {
    fontSize: 11,
    color: '#C4C6CE',
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: '#838899',
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
  inputContainer: {
    margin: 32,
    flexDirection: 'row',
  },

  photo: {
    alignItems: 'flex-end',
    marginHorizontal: 32,
    marginTop: -12,
  },
});
