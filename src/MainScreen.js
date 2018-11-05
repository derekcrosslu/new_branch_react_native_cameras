import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, Platform, Text, View, TouchableOpacity, Image, StatusBar} from 'react-native';
import axios from 'axios';

export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

    this.getNvr = this.getNvr.bind(this);
  }

  componentWillMount() {
    // this.getNvr();
  }

  getNvr() {
      axios.get('http://96.239.60.172:9002')
      .then((res) => {
        console.log(res, 'nvr response');
      })
      .catch((err) => {
        console.log(err, 'error with nvr request');
      })
  }

  render() {

    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
     
          <StatusBar
               backgroundColor="#840e26"
               barStyle="light-content"
          />
        <View style={{flex: 1}}>

          <View style={styles.header}>
            <Text style={styles.headerText}>Intercom</Text>
          </View>

          <View style={{width: '100%', justifyContent: 'center', height: 70, paddingLeft: 20}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>Please select the station you want to call</Text>
          </View>

          <TouchableOpacity style={{padding: 10, paddingLeft: 20, borderBottomWidth: 1.2, borderColor: '#dbdbdb', flexDirection: 'row'}} onPress={() => this.props.navigation.navigate("intercom", {"location": "Kitchen"})}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>1. Kitchen</Text>
            </View>
            <View style={{paddingRight: 20}}>
              <Image source={require('../img/telephone-handle-silhouette.png')} style={{width: 20, height: 20}}/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{padding: 10, paddingLeft: 20, borderBottomWidth: 1.2, borderColor: '#dbdbdb', flexDirection: 'row'}} onPress={() => this.props.navigation.navigate("intercom", {"location": "Lobby"})}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>2. Lobby</Text>
            </View>
            <View style={{paddingRight: 20}}>
              <Image source={require('../img/telephone-handle-silhouette.png')} style={{width: 20, height: 20}}/>
            </View>
          </TouchableOpacity>

        {/* <View elevation={5} style={styles.buttonContainer}>
          <Text style={styles.textStyle}>Shadow Applied</Text>
        </View>
        */}

        </View>
        
        <View style={{flexDirection: 'row', height: '10%', borderTopWidth: .8, borderColor: 'grey'}}>
          <TouchableOpacity style={{width: '25%',  alignItems: 'center', justifyContent: 'center', backgroundColor: '#dbdbdb', borderColor: 'black', borderRightWidth: .3}} onPress={() => this.props.navigation.navigate("Home")}>
            <Image source={require('../img/speaking.png')} resizeMode="contain" style={{width: "34%"}}/>
            <Text style={{fontSize: 16, color: "#BA2745"}}>Intercom</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{width: '25%',  alignItems: 'center', justifyContent: 'center', backgroundColor: '#ededed', borderColor: 'black', borderRightWidth: .3}} onPress={() => this.props.navigation.navigate("Logs")}>
            <Image source={require('../img/list-with-dots(1).png')} resizeMode="contain" style={{width: "25%"}}/>
            <Text style={{fontSize: 14, color: "black"}}>Logs</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{width: '25%',  alignItems: 'center', justifyContent: 'center', backgroundColor: '#ededed', borderColor: 'black', borderRightWidth: .3}} onPress={() => this.props.navigation.navigate("Service")}>
            <Image source={require('../img/building(1).png')} resizeMode="contain" style={{width: "25%"}}/>
            <Text style={{fontSize: 14, color: "black"}}>Services</Text>
          </TouchableOpacity>


          <TouchableOpacity style={{width: '25%',  alignItems: 'center', justifyContent: 'center', backgroundColor: '#ededed'}} onPress={() => this.props.navigation.navigate("More")}>
            <Image source={require('../img/more(1).png')} resizeMode="contain" style={{width: "29%"}}/>
            <Text style={{fontSize: 14, color: "black"}}>More</Text>
          </TouchableOpacity>
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
  textStyle: {
    color: '#FFFFFF'
  },
  buttonContainer: {
    marginTop: '10%',
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#BA2745'
  }
});

