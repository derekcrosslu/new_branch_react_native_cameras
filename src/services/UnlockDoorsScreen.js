import React, {Component} from 'react';
import {StyleSheet, Platform, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import Slider from "react-native-slider";

import axios from 'axios';

export default class KeyCardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      change: 'Front Door',
      change2: 'Package Room',
      value2: 0
    }
    this.unlockedDoor = this.unlockedDoor.bind(this);
    this.unlockedDoor2 = this.unlockedDoor2.bind(this);
    this.closedDoor = this.closedDoor.bind(this);
    //coopeer s - add server request to lock/unlock featured doors
    this.getOpenFront = this.getOpenFront.bind(this);
    this.getOpenPkgRm = this.getOpenPkgRm.bind(this);
  }

  unlockedDoor() {
    if (this.state.value === 1) {
      this.setState({
        change: 'Door is open',
        value: 1
      });
      // make it so that one function can handle all of the doors open 
      // and another function can handle all closing doors.
      alert("Door is unlocked.");
      this.interval = setInterval(() => this.closedDoor(), 5000);
    }
  }

  unlockedDoor2() {
    if (this.state.value2 === 1) {
      this.setState({
        change2: 'Package Door is open',
        value2: 1
      });
      alert("Package Room is unlocked.");
      this.interval = setInterval(() => this.closedDoor(), 5000);
    }
  }

  closedDoor() {
    this.setState({
      change: 'Front Door',
      value: 0,
      value2: 0
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getOpenFront() {
    axios.get('http://172.85.43.18:18000/state.xml?relay1State=1&time=1544110432472')
      .then((res) => {
        // cooper s - receive whatever data you need hear then call unlockedDoor
        this.unlockedDoor();
    })
    .catch((err) => {
      alert('error with relay server request: ', err );
    });  
  }//end openLck

  getOpenPkgRm() {
    alert("Gotta Go for Number 2...");
    this.unlockedDoor2();
    axios.get('http://172.85.43.18:18000/state.xml?relay1State=1&time=1544110432472')
      .then((res) => {
        // cooper s - receive whatever data you need hear then call unlockedDoor
        this.unlockedDoor2();
    })
    .catch((err) => {
      alert('error with relay server request: ', err );
    });  
  }//end openLck
  

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image source={require('../../img/back.png')} style={{width: 25, height: 25}}/>
            </TouchableOpacity>
            <View style={styles.paddingL}>
              <Text style={styles.headerText}>Unlock Doors</Text>
            </View>
          </View>

          <View style={styles.body}>

          <View style={{marginTop: 50, marginLeft: 20, marginBottom: 100}}>
            <View style={{paddingBottom: 25, paddingLeft: 20}}>
              <Text style={{fontSize: 18, color: 'black'}}>{this.state.change}</Text>
            </View>
            <Slider
              style={{width: '80%'}}
              thumbImage={require('../../img/thumb.png')}
              value={this.state.value}
              onValueChange={value => this.setState({ value })}
              minimumValue={0}
              maximumValue={1}
              thumbStyle={{width: 60, height: 60, borderRadius:30}}
              trackStyle={{width: '100%', height: 60, borderRadius: 30, backgroundColor: '#BA2745'}}
              onSlidingComplete={this.getOpenFront}
            />
          </View>

          <View style={{marginTop: 50, marginLeft: 20, marginBottom: 100}}>
            <View style={{paddingBottom: 25, paddingLeft: 20}}>
              <Text style={{fontSize: 18, color: 'black'}}>{this.state.change2}</Text>
            </View>
            <Slider
              style={{width: 300}}
              thumbImage={require('../../img/thumb.png')}
              value={this.state.value2}
              onValueChange={value2 => this.setState({ value2 })}
              minimumValue={0}
              maximumValue={1}
              thumbStyle={{width: 60, height: 60, borderRadius:30}}
              trackStyle={{width: '100%', height: 60, borderRadius: 30, backgroundColor: '#BA2745'}}
              onSlidingComplete={this.getOpenPkgRm}
            />
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
  },
  body: {
    flex: 1
  }
});
  