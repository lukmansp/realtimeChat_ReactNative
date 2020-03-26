import React from 'react';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    height: 60,
  },
  btnText: {
    fontSize: 20,
    color: 'darkblue',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
    marginBottom: 12,
    borderRadius: 5,
  },
  inputMessage: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '85%',
    marginBottom: 12,
    borderRadius: 20,
  },
  sendButton: {
    alignItems: 'center',
    marginBottom: 12,
    marginLeft: 10,
    height: 40,
    width: 40,
    paddingTop: 10,
    paddingLeft: 5,
    backgroundColor: '#2196F3',
    borderRadius: 20,
  },
  containerAuth: {
    flex: 1,
  },
  greeting: {
    marginTop: 32,
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
    marginBottom: 60,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  inputAuth: {
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
export default styles;
