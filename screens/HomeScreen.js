import React from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Image,
  Dimensions,
  LayoutAnimation,
  StyleSheet,
  View,
} from 'react-native';
import User from '../User';
import firebase from 'firebase';
import GetLocation from 'react-native-get-location';
import Icon from 'react-native-vector-icons/Ionicons';
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    users: [],
    dbRef: firebase.database().ref('users'),
    latitude: '',
    longitude: '',
    location: [],
  };
  getLocation = async () => {
    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        firebase
          .database()
          .ref('/users/' + User.phone)
          .child('latitude')
          .set(location.latitude);
        firebase
          .database()
          .ref('/users/' + User.phone)
          .child('longitude')
          .set(location.longitude);
        firebase
          .database()
          .ref('/users/' + User.phone)
          .child('online')
          .set('online');
        User.online = 'online';
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      });
    this._isMounted = true;
  };
  getUser = async () => {
    await this.state.dbRef.on('child_added', val => {
      let person = val.val();
      person.phone = val.key;
      if (person.phone === User.phone) {
        User.name = person.name;
        User.image = person.image ? person.image : null;
      } else {
        this.setState(prevState => {
          firebase
            .database()
            .ref('messages')
            .child(User.phone)
            .child(person.phone)
            .on('child_added', val => {
              person.newTime = val.val().time;
              person.newMessage = val.val().message;
            });
          return {
            users: [...prevState.users, person],
          };
        });
      }
    });
  };
  componentDidMount = async () => {
    await this.getUser();
    await this.getLocation();
  };
  componentWillUnmount() {
    this.state.dbRef.off();
  }

  renderRow = ({ item }) => {
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('FriendProfile', item)}
        >
          <Image
            source={
              item.image
                ? { uri: item.image }
                : require('../images/account.png')
            }
            style={{
              width: 60,
              height: 60,
              resizeMode: 'contain',
              borderRadius: 32,
              resizeMode: 'cover',
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('chat', item)}
          style={styles.message}
        >
          <View>
            <Text style={{ fontSize: 17 }}>{item.name}</Text>
            <Text>{item.online}</Text>
            <Text style={{ marginLeft: '80%' }}>
              {new Date(item.newTime).getHours()}:
              {new Date(item.newTime).getMinutes()}
            </Text>
            <Text style={{ color: '#6a737d' }}>{item.newMessage}...</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    console.disableYellowBox = true;
    const { height } = Dimensions.get('window');
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          style={{ heigh: 10 }}
          data={this.state.users}
          renderItem={this.renderRow}
          keyExtractor={item => item.phone}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <Image
                source={require('../images/Chat-ok.png')}
                style={{ width: 70, height: 70 }}
              />
            </View>
          )}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  message: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    borderRadius: 50,
  },
  title: {
    fontSize: 30,
    marginVertical: 10,
    marginLeft: 13,
    fontWeight: 'bold',
    height: 40,
    width: 50,
    borderRadius: 50,
    backgroundColor: 'rgba(21,22,48,0.1)',
  },
  header: {
    backgroundColor: 'white',
  },
});
