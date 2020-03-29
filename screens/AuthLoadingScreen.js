import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, View } from 'react-native';
import User from '../User';
import firebase from 'firebase';
export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }
  componentWillMount() {
    var config = {
      apiKey: 'AIzaSyAA0oOiFwLbEfAKPKYmRiZAkcEk-d77OOI',
      authDomain: 'fir-chat-14953.firebaseapp.com',
      databaseURL: 'https://fir-chat-14953.firebaseio.com',
      projectId: 'fir-chat-14953',
      storageBucket: 'fir-chat-14953.appspot.com',
      messagingSenderId: '429991719789',
      appId: '1:429991719789:web:4e9527f677e189c2b52064',
    };
    // Initialize Firebase
    firebase.initializeApp(config);
  }
  _bootstrapAsync = async () => {
    user = await AsyncStorage.getItem('userPhone');
    console.log(User.phone);
    await firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user && User.phone ? 'App' : 'Auth');
    });
    // this.props.navigation.navigate(User.phone ? 'App' : 'Auth');
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle='default' />
      </View>
    );
  }
}
