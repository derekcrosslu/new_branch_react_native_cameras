import React, {Component} from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import Navigation from './src/Navigation.js';
import Login from './src/Login.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: undefined,
      rememberMe: true,
      PersistingLogin: false
    }
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.rememberMe = this.rememberMe.bind(this);
    this._retrieveData = this._retrieveData.bind(this);
    this._removeData = this._removeData.bind(this);
    this._rememberData = this._rememberData.bind(this);
  }

  componentWillMount() {
    this._retrieveData();
    this._retrieveRememberData();
  }

  rememberMe() {
    let opp = !this.state.rememberMe;
    this.setState({
      rememberMe: opp
    });
    this._rememberData(opp);
  }

  logIn(data) {
    this.setState({
      loggedIn: true
    });

    let Persist = {username: 'jmulder', PersistingLogin: true, userData: data};
    _storeData = async () => {
      try {
        await AsyncStorage.setItem('Persist', JSON.stringify(Persist));
        console.log("user was saved!");
      } catch (error) {
        console.log('There was an error!', error);
      }
    }
    if (this.state.rememberMe) {
      _storeData();
    }
  }

  logOut() {
    this.setState({
      loggedIn: false
    });
    this._removeData();
  }


  _retrieveRememberData = async () => {
    try {
      const rememberValue = await AsyncStorage.getItem('Remember');
      if (rememberValue !== null) {

        this.setState({
          rememberMe: JSON.parse(rememberValue)
        });
        console.log(rememberValue, "value");
      } else {
        console.log('Nothing was found', rememberValue);
      }
    } catch (error) {
      console.log("retrieveRemeberData", error);
    }
  }

  _rememberData = async (data) => {
    try {
      await AsyncStorage.setItem("Remember", `${data}`);
      console.log("rememberData works?");
    } catch (error) {
      console.log("rememberData Error:", error);
    }
  }

  _removeData = async () => {
    try {
      await AsyncStorage.removeItem("Persist");
      console.log("Login info was removed!");
    } catch (error) {
      console.log("removeItem Error:", error);
    }
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('Persist');
      if (value !== null) {
        let isTrue = JSON.parse(value).PersistingLogin;
        if (isTrue) {
          console.log('istrue ran');
          this.setState({
            loggedIn: true
          });
        } else {
          console.log('was not true');
          this.setState({
            loggedIn: false
          }); 
        } 
      } else {
        this.setState({
          loggedIn: false
        }); 
        console.log('The key you searched for doesnt exist');
      }
     } catch (error) {
       console.log("there was an error trying to find things in storage or something", error);
     }
  }

  render() { 
    let Page;
    if (this.state.loggedIn === false) {
      Page = <Login login={this.logIn} rememberMeChange={this.rememberMe} rememberMe={this.state.rememberMe}/>;
    } else if (this.state.loggedIn === true) {
      Page = <Navigation screenProps={{logOut: this.logOut}}/>;
    } else {
      Page = <View></View>;
    }

    return (
      <View style={styles.container}>
        {Page}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});