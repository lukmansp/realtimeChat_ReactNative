import React from 'react';
import {
  View,
  Text,
  AsyncStorage,
  SafeAreaView,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import User from '../User';
// import styles from '../constants/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';
import GetLocation from 'react-native-get-location';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };
  state = {
    name: User.name,
    imageSource: User.image
      ? { uri: User.image }
      : require('../images/account.png'),
    upload: false,
    location: [],
  };
  async componentDidMount() {
    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        this.setState({
          location: location,
        });
      })
      .catch(error => {
        const { code, message } = error;
        console.log(error, message);
      });
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  handleChange = key => val => {
    this.setState({ [key]: val });
  };
  changeName = async () => {
    if (this.state.name.length < 3) {
      Alert.alert('Error', 'Please enter valid name');
    } else if (User.name !== this.state.name) {
      User.name = this.state.name;
      User.latitude = this.state.location.latitude;
      User.longitude = this.state.location.longitude;
      this.updateUser();
    }
  };

  _logOut = async () => {
    firebase
      .database()
      .ref('/users/' + User.phone)
      .child('online')
      .set('offline');
    await AsyncStorage.clear();
    await firebase.auth().signOut;
    this.props.navigation.navigate('Auth');
  };
  changeImage = () => {
    const options = {
      quality: 0.7,
      allowsEditing: true,
      mediaType: 'photo',
      noData: true,
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
        this.setState(
          {
            upload: true,
            imageSource: { uri: response.uri },
          },
          this.uploadFile
        );
      }
    });
  };
  updateUser = async () => {
    await firebase
      .database()
      .ref('users/')
      .child(User.phone)
      .set(User);
    // latitude: -6.6210828,
    // longitude: 106.816159,

    await Alert.alert('Success', 'succesfull.');
  };
  updateUserImage = imageUrl => {
    User.image = imageUrl;
    User.latitude = this.state.location.latitude;
    User.longitude = this.state.location.longitude;
    this.updateUser();
    this.setState({ upload: false, imageSource: { uri: imageUrl } });
  };
  uploadFile = async () => {
    const file = await this.uriToBlob(this.state.imageSource.uri);
    await firebase
      .storage()
      .ref(`profile_pictures/${User.phone}.png`)
      .put(file)
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => this.updateUserImage(url))
      .catch(error => {
        this.setState({
          upload: false,
          imageSource: require('../images/account.png'),
        });
        Alert.alert(error, 'Error upload image');
      });
  };
  uriToBlob = uri => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new Error('Error on upload image'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  };
  render() {
    console.disableYellowBox = true;

    LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
        <View style={styles.dataProfil}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={this.changeImage}>
              {this.state.upload ? (
                <ActivityIndicator size='large' />
              ) : (
                <Image style={styles.avatar} source={this.state.imageSource} />
              )}
            </TouchableOpacity>
            <View>
              <TouchableOpacity onPress={this.changeImage}>
                <Text style={styles.btnText}>
                  <Icon name='pencil-alt' size={17} color='black' />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.name}>{User.phone}</Text>
          <TextInput
            style={styles.input}
            value={this.state.name}
            onChangeText={this.handleChange('name')}
          />
          <View style={styles.edit}>
            <TouchableOpacity onPress={this.changeName}>
              <Text style={styles.btnText}>
                <Icon name='pencil-alt' size={17} color='black' />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>21</Text>
            <Text style={styles.statTitle}>Post</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>50</Text>
            <Text style={styles.statTitle}>Contacts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>90</Text>
            <Text style={styles.statTitle}>Chating</Text>
          </View>
        </View>
        <View style={styles.logout}>
          <TouchableOpacity onPress={this._logOut}>
            <Text style={styles.btnText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dataProfil: {
    marginTop: -14,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  avatarContainer: {
    // padding: 0,
    // shadowRadius: 50,
    // shadowOpacity: 20,
    // borderWidth: 3,
    // borderRadius: 50,
    // borderColor: '#E9446A',
    shadowOffset: { width: 1, height: 10 },
    shadowColor: '#151372',
    shadowRadius: 50,
    shadowOpacity: 7,
    backgroundColor: '#FFF',
    //elevation: 3,
    // backgroundColor: '#FFF',
    borderRadius: 80,
    marginTop: 40,
  },
  avatar: {
    marginTop: 30,
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  name: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    backgroundColor: 'white',
    width: 300,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 32,
    alignItems: 'center',
    borderRadius: 10,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statAmount: {
    color: '#4F566d',
    fontSize: 18,
    fontWeight: '300',
  },
  statTitle: {
    color: '#C3C5CD',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '50%',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 5,
    marginLeft: -50,
  },
  edit: {
    marginTop: -55,
    marginLeft: 190,
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%',
    height: '13 %',
    borderRadius: 50,
    backgroundColor: 'rgba(21,22,48,0.1)',
  },
  logout: {
    marginLeft: 140,
    marginTop: -10,
    marginHorizontal: 30,
    backgroundColor: '#E9446A',
    borderRadius: 4,
    height: 35,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 17,
    color: 'white',
  },
});
