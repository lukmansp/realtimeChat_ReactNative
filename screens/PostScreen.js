import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  LayoutAnimation,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default class PostScreen extends React.Component {
  render() {
    LayoutAnimation.easeInEaseOut();
    state = {
      text: '',
      image: null,
    };
    handleChoosePhoto = () => {
      const options = {
        noData: true,
      };
      ImagePicker.launchImageLibrary(options, response => {
        if (response.uri) {
          this.setState({image: response});
        }
      });
    };
    handleChooseCamera = () => {
      const options = {
        noData: true,
      };
      ImagePicker.launchCamera(options, response => {
        if (response.uri) {
          this.setState({image: response});
        }
      });
    };
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-alt-circle-left" size={24} color="#D8D9DB"></Icon>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{fontWeight: '500'}} placeholder="share?">
              PostScreen{' '}
            </Text>
          </TouchableOpacity>
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
            style={{flex: 1}}
            placeholder="share someting?"></TextInput>
        </View>
        <TouchableOpacity style={styles.photo} onPress={this.handleChoosePhoto}>
          <Icon name="camera" size={32} color="#D8D9Db" />
        </TouchableOpacity>
        <View style={{marginHorizontal: 32, marginTop: 32, height: 150}}>
          <Image style={{width: '100%', height: '100%'}}></Image>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#D8D9DB',
  },
  inputContainer: {
    margin: 32,
    flexDirection: 'row',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 24,
    marginRight: 16,
  },
  photo: {
    alignItems: 'flex-end',
    marginHorizontal: 32,
  },
});
