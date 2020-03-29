import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  AsyncStorage,
  LayoutAnimation,
  StatusBar,
  Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import User from '../User';
import firebase from 'firebase';
import GetLocation from 'react-native-get-location';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    phone: '',
    name: '',
    email: '',
    password: '',
    latitude: null,
    longitude: null,
    location: [],
  };
  handleChange = key => val => {
    this.setState({ [key]: val });
  };
  async componentDidMount() {
    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);
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

  submitForm = async () => {
    if (this.state.phone.length < 6) {
      Alert.alert('Error', 'Input correct number');
    } else if (this.state.name.length < 3) {
      Alert.alert('Error', 'Input valid name');
    } else {
      await AsyncStorage.setItem('userPhone', this.state.phone);
      User.phone = this.state.phone;
      User.email = this.state.email;
      await firebase
        .database()
        .ref('users/' + User.phone)
        .set({
          name: this.state.name,
          email: this.state.email,
          status: 'online',
          latitude: this.state.location.latitude,
          longitude: this.state.location.longitude,
        });
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);

      this.props.navigation.navigate('App');
    }
  };
  render() {
    console.disableYellowBox = true;

    return (
      <View style={styles.container}>
        <Image source={require('../images/Chat-ok.png')} style={styles.logo} />
        <Image
          source={require('../images/menu2.png')}
          style={{
            position: 'absolute',
            bottom: -450,
            right: -305,
          }}
        />
        <TouchableOpacity
          style={styles.back}
          onPress={() => this.props.navigation.goBack()}
        >
          <Icon name='arrow-left' size={32} color='#FFF' />
        </TouchableOpacity>
        <Text style={styles.greeting}>Hello lets signup </Text>
        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Phone</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              onChangeText={this.handleChange('phone')}
              value={this.state.phone}
            ></TextInput>
          </View>
          <View>
            <Text style={styles.inputTitle}>Full name</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              onChangeText={this.handleChange('name')}
              value={this.state.name}
            ></TextInput>
          </View>
          <View>
            <Text style={styles.inputTitle}> Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              onChangeText={this.handleChange('email')}
              value={this.state.email}
            ></TextInput>
          </View>
          <View style={{ marginTop: 22 }}>
            <Text style={styles.inputTitle}> Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize='none'
              onChangeText={this.handleChange('password')}
              value={this.state.password}
            ></TextInput>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.submitForm}>
          <Text style={{ color: '#FFF', fontWeight: '500' }}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignSelf: 'center', marginTop: 32 }}>
          <Text style={{ color: '#414959', fontSize: 12 }}>
            Have accoutn?{' '}
            <Text
              style={{ fontWeight: '500', color: '#E9446A' }}
              onPress={() => this.props.navigation.navigate('Login')}
            >
              Login
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    marginTop: -30,
    width: 100,
    height: 100,
    marginLeft: -250,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  greeting: {
    marginTop: -90,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    // color: '#FFF',
  },
  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: '#E9446A',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: '#8A8F9e',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    width: 300,
    fontSize: 15,
    color: '#161F3D',
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: '#E9446A',
    borderRadius: 4,
    height: 35,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    top: 46,
    left: 32,
    width: 33,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(21,22,48,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#E1E2E6',
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
