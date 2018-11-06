import React, {Component} from 'react';
import {StyleSheet, Platform, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import Slider from "react-native-slider";

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
  }

  unlockedDoor() {
    if (this.state.value === 1) {
      this.setState({
        change: 'Door is open'
      });
    }
  }

  unlockedDoor2() {
    if (this.state.value2 === 1) {
      this.setState({
        change2: 'Door is open'
      });
    }
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
              onSlidingComplete={this.unlockedDoor}
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
              onSlidingComplete={this.unlockedDoor2}
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
  