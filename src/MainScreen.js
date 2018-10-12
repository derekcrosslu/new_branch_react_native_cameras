import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';



export default class MainScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <View style={styles.container}>
        <Text>Hello Test Dev branch 3</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#828282',
  }
});
