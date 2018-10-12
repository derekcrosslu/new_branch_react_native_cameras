import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Navigation from './src/Navigation.js';



export default class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Navigation />
    );
  }
}
