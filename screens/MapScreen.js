import React, {Component} from 'react';
import MapView from 'react-native-maps';
import firebase from 'firebase';
class MapScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    users: [],
    dbRef: firebase.database(),
  };
  componentDidMount() {
    this.getLocation();
  }
  getLocation() {
    this.state.dbRef.ref('/users').on('value', snapshot => {
      const data = snapshot.val();
      const users = Object.values(data);
      this.setState({
        users: users,
      });
    });
  }
  render() {
    const marker = this.state.users.map(item => (
      <MapView.Marker
        coordinate={{
          latitude: item.latitude,
          longitude: item.longitude,
        }}
        title={item.name}
      />
    ));
    return (
      <MapView
        style={{flex: 1, width: window.width}}
        region={{
          latitude: -6.6210828,
          longitude: 106.8185388,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {marker}
      </MapView>
    );
  }
}

export default MapScreen;
