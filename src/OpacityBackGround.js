import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

export default class OpacityBackGround extends Component {
  constructor(props) {
    super(props);

  }

  render() {
      return (
        <TouchableOpacity style={styles.container} onPress={this.props.goBack}>

        </TouchableOpacity>
      )

  }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#444444',
        opacity: 0.9,
        zIndex: 100
    }
  });