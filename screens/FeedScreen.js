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
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import Fire from '../Fire';
import firebase from 'firebase';
import Animated from 'react-native-reanimated';
import User from '../User';
import ImagePicker from 'react-native-image-picker';

export default class FeedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textMessage: '',
      messageList: [],
      dbRef: firebase.database().ref('story'),
    };
    this.keyboardHeight = new Animated.Value(0);
    this.bottomPadding = new Animated.Value(60);
  }
  componentDidMount() {
    this.state.dbRef.on('child_added', value => {
      this.setState(prevState => {
        return {
          messageList: [...prevState.messageList, value.val()],
        };
      });
    });
  }
  componentWillMount() {
    this.state.dbRef.off();
  }
  keyboardEvent = (event, isShow) => {
    let heightOS = isIOS ? 60 : 80;
    let bottomOS = isIOS ? 120 : 140;
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: isShow ? 60 : 0,
      }),
      Animated.timing(this.bottomPadding, {
        duration: event.duration,
        toValue: isShow ? 120 : 60,
      }),
    ]).start();
  };
  handleChange = key => val => {
    // console.log(val);
    this.setState({ [key]: val });
  };
  sendMessage = async () => {
    if (this.state.textMessage.length > 0) {
      let msgId = this.state.dbRef.push().key;
      let message = {
        message: this.state.textMessage,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: User.name,
      };

      this.state.dbRef.push(message);
      this.setState({ textMessage: '' });
    }
  };
  changeImage = () => {
    const options = {
      quality: 0.7,
      allowsEditing: true,
      mediaType: 'photo',
      noData: true,
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        waitUntilSaved: true,
        path: 'images',
        cameraRoll: true,
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.error) {
        console.log(error);
      } else if (!response.didCancel) {
        Alert.alert(':)', 'Fitur sedang dalam pengembangan');
        // this.setState(
        //   {
        //     upload: true,
        //     imageSource: { uri: response.uri },
        //   },
        //   this.uploadFile
        // );
      }
    });
  };
  feedback = () => {
    Alert.alert(':)', 'Fitur sedang dalam pengembangan');
  };
  renderPost = item => {
    console.log(item);
    return (
      <View style={styles.feedItem}>
        <View
          style={{
            marginHorizontal: 32,
            marginTop: 32,
            height: 150,
          }}
        >
          <Image style={{ width: '100%', height: '100%' }}></Image>
        </View>
        {/* <Image source={item} style={styles.avatar} /> */}
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View>
              <Text style={styles.name}>{item.from}</Text>
              <Text style={styles.timestamp}>
                {moment(item.time).fromNow()}
              </Text>
            </View>
            <Icon name='angle-down' size={24} color='#737888' />
          </View>
          <Text style={styles.post}>{item.message}</Text>
          {/* <Image
            source={post.image}
            style={styles.postImage}
            resizeMode='cover'
          /> */}
          <View style={styles.feedback}>
            <TouchableOpacity onPress={this.feedback}>
              <Icon
                name='heart'
                size={24}
                color='#73788b'
                style={{ marginRight: 20 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.feedback}>
              <Icon name='rocketchat' size={24} color='#73788b' />
            </TouchableOpacity>
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
          <Text style={styles.headerTitle}>Storys</Text>
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
            onChangeText={this.handleChange('textMessage')}
            value={this.state.textMessage}
            placeholder='share someting?'
          ></TextInput>
        </View>
        <View>
          <TouchableOpacity onPress={this.sendMessage} style={styles.sendPost}>
            <Text style={{ color: 'white', fontSize: 15 }}>Posting</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.photo} onPress={this.changeImage}>
            <Icon name='camera' size={32} color='#6a6e71' />
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.feed}
          // ref={ref => (this.flatList = ref)}
          // onContentSizeChange={() =>
          //   this.flatList.scrollToEnd({ animated: true })
          // }
          data={this.state.messageList}
          renderItem={({ item }) => this.renderPost(item)}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  feedback: {
    flexDirection: 'row',
    marginTop: 50,
  },
  sendPost: {
    marginLeft: '10%',
    alignItems: 'center',
    backgroundColor: '#E9446A',
    width: '30%',
    height: 30,
    borderRadius: 10,
  },
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
    shadowOffset: { height: 5 },
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
    marginBottom: 20,
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
    marginLeft: '80%',
    marginHorizontal: 32,
    marginTop: -30,
    width: 30,
  },
});
