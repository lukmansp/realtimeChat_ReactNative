import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import MainMenu from './screens/MainMenu';
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });
  return <MainMenu />;
};
export default App;
