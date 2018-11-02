import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Navigation from './src/Navigation.js';
import Login from './src/Login.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  logIn() {
    this.setState({
      loggedIn: true
    });
  }

  logOut() {
    this.setState({
      loggedIn: false
    });
  }

  render() { 
    let Page;
    if (!this.state.loggedIn) {
      Page = <Login login={this.logIn}/>;
    } else {
      Page = <Navigation screenProps={{logOut: this.logOut}}/>;
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