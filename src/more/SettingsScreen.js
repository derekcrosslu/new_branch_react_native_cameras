import React, { Component } from 'react';
import { StyleSheet, Platform, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';

export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vibrate: true
    }
  }

  render() {
    let ring;
    let vibe;

    if (this.state.vibrate) {
      ring = <Image source={require('../../img/emptycircle.png')} style={{width: 25, height: 25}}/>;
      vibe = <Image source={require('../../img/filled-circle.png')} style={{width: 25, height: 25}}/>;
    } else {
      vibe = <Image source={require('../../img/emptycircle.png')} style={{width: 25, height: 25}}/>;
      ring = <Image source={require('../../img/filled-circle.png')} style={{width: 25, height: 25}}/>;  
    }
    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image source={require('../../img/left-arrow.png')} style={{width: 25, height: 25}}/>
            </TouchableOpacity>
            <View style={styles.paddingL}>
              <Text style={styles.headerText}>Settings</Text>
            </View>
          </View>

          <View style={{flex: 1}}>
            <View style={{margin: 20}}>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>Ringer Mode</Text>
            </View>

            <TouchableOpacity style={{flexDirection: 'row',padding: 5, paddingLeft: 15, margin: 5, marginBottom: 0}} onPress={() => this.setState({vibrate: false})}>
              {ring}
              <View style={{paddingLeft: 10}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Ring</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection: 'row',padding: 5, paddingLeft: 15, margin: 5}} onPress={() => this.setState({vibrate: true})}>
              {vibe}
              <View style={{paddingLeft: 10}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Vibrate</Text>
              </View>
            </TouchableOpacity>

              <View style={{width: '100%', alignItems: 'center'}}>
                <TouchableOpacity onPress={this.submitNewPerson} style={{width: 150, height: 60, backgroundColor: '#BA2745',alignItems: 'center', justifyContent: 'center', borderRadius: 10}}>
                  <Text style={{fontSize: 26, color: 'white'}}>Save</Text>
                </TouchableOpacity>
              </View>
          </View>

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