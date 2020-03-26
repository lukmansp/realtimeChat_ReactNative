import firebase from 'firebase';
class Fire {
  // constructor() {
  //   this.init();
  //   this.checkAuth();
  // }
  // init = () => {
  //   if (!firebase.apps.length) {
  //     firebase.initializeApp({
  //       apiKey: 'AIzaSyBmMQutQ3hqKl9CB2soDhgQn3LoiMwFeUw',
  //       authDomain: 'chat-ok-1ab0e.firebaseapp.com',
  //       databaseURL: 'https://chat-ok-1ab0e.firebaseio.com',
  //       projectId: 'chat-ok-1ab0e',
  //       storageBucket: 'chat-ok-1ab0e.appspot.com',
  //       messagingSenderId: '751177572914',
  //       appId: '1:751177572914:web:94430d3d90a22ab791922b',
  //     });
  //   }
  // };
  checkAuth = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    });
  };
  send = messages => {
    messages.forEach(item => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user,
      };
      this.db.push(message);
    });
  };
  parse = message => {
    const {user, text, timestamp} = message.val();
    const {key: _id} = message;
    const createdAt = new Date(timestamp);
    return {
      _id,
      createdAt,
      text,
      user,
    };
  };
  get = callback => {
    this.db.on('child_added', snapshot => callback(this.parse(snapshot)));
  };
  off() {
    this.db.off();
  }
  get db() {
    return firebase.database().ref('messages');
  }
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}
export default new Fire();
