import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ChatScreen from './screens/ChatScreen';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import ProfileScreen from './screens/ProfileScreen';
import NotificationScreen from './screens/NotificationScreen';
import PostScreen from './screens/PostScreen';
import MapScreen from './screens/MapScreen';
import FeedScreen from './screens/FeedScreen';

const AppStack = createStackNavigator({
  Home: HomeScreen,
  chat: ChatScreen,
});
AppStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = navigation.state.index === 0;
  return {
    tabBarVisible,
  };
};
const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});

const TabNavigator = createStackNavigator(
  {
    default: createBottomTabNavigator(
      {
        Message: {
          screen: AppStack,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon name='rocketchat' size={24} color={tintColor} />
            ),
          },
        },

        Notification: {
          screen: NotificationScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon name='bell' size={24} color={tintColor} />
            ),
          },
        },
        // Post: {
        //   screen: FeedScreen,
        //   navigationOptions: {
        //     tabBarIcon: ({tintColor}) => (
        //       <Icon
        //         name="plus-circle"
        //         size={34}
        //         color="#ffd766"
        //         style={{
        //           shadowColor: '#e9446a',
        //           shadowOffset: {width: 0, height: 0},
        //           shadowRadius: 16,
        //           shadowOpacity: 0.3,
        //         }}
        //       />
        //     ),
        //   },
        // },
        Story: {
          screen: FeedScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon
                name='plus-circle'
                size={34}
                color='#ffd766'
                style={{
                  shadowColor: '#e9446a',
                  shadowOffset: { width: 0, height: 0 },
                  shadowRadius: 16,
                  shadowOpacity: 0.3,
                }}
              />
            ),
          },
        },
        Profile: {
          screen: ProfileScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon name='user-alt' size={24} color={tintColor} />
            ),
          },
        },
        map: {
          screen: MapScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon name='map' size={24} color={tintColor} />
            ),
          },
        },
      },
      {
        defaultNavigationOptions: {
          tabBarOnPress: ({ navigation, defaultHandler }) => {
            if (navigation.state.key === 'Story') {
              navigation.navigate('postModal');
            } else {
              defaultHandler();
            }
          },
        },
      },
      {
        tabBarOptions: {
          activeTintColor: '#161f3d',
          inactiveTintColor: '#b8bbc4',
          showLabel: false,
        },
      }
    ),
    postModal: {
      screen: FeedScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    // initialRouteName: 'postModal',
  }
);
export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: TabNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
