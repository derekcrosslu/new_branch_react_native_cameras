import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, Platform, Text, View, TouchableOpacity, Image, ScrollView, Slider} from 'react-native';

export default class KeyCardScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image source={require('../../img/back.png')} style={{width: 25, height: 25}}/>
            </TouchableOpacity>
            <View style={styles.paddingL}>
              <Text style={styles.headerText}>My Building Cameras</Text>
            </View>
          </View>

          {/* <View style={{flex: 1}}>
            <Slider></Slider>
          </View>
          
          <View>
            <Text>View More</Text>
          </View> */}

      </View>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: Platform.OS === 'ios' ? 40: 60,
    alignItems: 'center',
    paddingLeft: 20,
    backgroundColor: '#BA2745',
    flexDirection: 'row'
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  paddingL: {
    paddingLeft : 20
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#BA2745'
  }
});
  