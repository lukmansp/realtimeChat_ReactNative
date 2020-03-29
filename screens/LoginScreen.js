import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  LayoutAnimation,
} from 'react-native';
import * as firebase from 'firebase';
import User from '../User';
export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    phone: '',
    email: '',
    password: '',
    errorMessage: null,
  };
  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({ errorMessage: error.message }));
    User.phone = this.state.phone;
    // this.props.navigation.navigate('App');
  };
  render() {
    LayoutAnimation.easeInEaseOut;
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content'></StatusBar>
        <Image source={require('../images/Chat-ok.png')} style={styles.logo} />
        {/* <Image
          source={require('../images/menu.png')}
          style={{marginTop: -450, marginLeft: 250}}
        /> */}
        <Image
          source={require('../images/menu2.png')}
          style={{ position: 'absolute', bottom: -450, right: -305 }}
        />
        <Text style={styles.greeting}>Hello Wellcome back! </Text>
        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}> Phone</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              onChangeText={phone => this.setState({ phone })}
              value={this.state.phone}
            ></TextInput>
          </View>
          <View>
            <Text style={styles.inputTitle}> Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            ></TextInput>
          </View>
          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}> Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize='none'
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            ></TextInput>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={{ color: '#FFF', fontWeight: '500' }}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignSelf: 'center', marginTop: 32 }}>
          <Text
            style={{ color: '#414959', fontSize: 12 }}
            onPress={() => this.props.navigation.navigate('Register')}
          >
            New user?{' '}
            <Text style={{ fontWeight: '500', color: '#E9446A' }}>
              Signup !
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    marginTop: -40,
    marginLeft: -200,
    width: 100,
    height: 100,
    borderRadius: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  greeting: {
    marginTop: -70,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    marginLeft: 90,
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
    marginBottom: 30,
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
});
