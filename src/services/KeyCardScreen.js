import React, { Component } from 'react';
import { StyleSheet, Platform, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView, AsyncStorage } from 'react-native';
import ArrowSwitch from './ArrowSwitch';
import Axios from 'axios';

export default class KeyCardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [""]    
    }
    this.changeArrow = this.changeArrow.bind(this);
    this.passDownInfo = this.passDownInfo.bind(this);
    this.nextScreen = this.nextScreen.bind(this);
    this._retrieveData = this._retrieveData.bind(this);
  }


  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('GuestInfo');
      if (value !== null) {
        let isTrue = JSON.parse(value)
        if (isTrue) {
          console.log("info was saved", isTrue);
          let guestArr = [];
          for (var i = 0; i < isTrue.guests.length; i++) {
            var guestStr = isTrue.guests[i].FIRST_NAME + ' ' + isTrue.guests[i].LAST_NAME;
            guestArr.push(guestStr);
          }
          this.setState({
            users: guestArr
          });
        } else {
          console.log('Something went wrong');
        } 
      } 
     } catch (error) {
       console.log("there was an error trying to find things in storage or something", error);
     }
  }

  changeArrow() {
    let newVar;
    if (this.state.showUser === undefined) {
      newVar = true;
    } else if (this.state.showUser === true) {
      newVar = false;
    } else if (this.state.showUser === false) {
      newVar = true;
    }

    this.setState({
      showUser: newVar
    });
  }

  componentWillMount() {
    this._retrieveData();
  }

  passDownInfo(info, index) {
    if (index === 0) {
      this.setState({
        passDownInfo: info
      }); 
    } else if (index === 1) {
      this.setState({
        passDownInfo2: info
      });    
    } else if (index === 2) {
      this.setState({
        passDownInfo3: info
      });      
    } else if (index === 3) {
      this.setState({
        passDownInfo4: info
      });  
    } else if (index === 4) {
      this.setState({
        passDownInfo5: info
      });  
    } else if (index === 5) {
      this.setState({
        passDownInfo6: info
      });  
    } else if (index === 6) {
      this.setState({
        passDownInfo7: info
      });  
    } else if (index === 7) {
      this.setState({
        passDownInfo8: info
      });  
    } else if (index === 8) {
      this.setState({
        passDownInfo9: info
      });  
    } else if (index === 9) {
      this.setState({
        passDownInfo10: info
      });  
    } else if (index === 10) {
      this.setState({
        passDownInfo11: info
      });  
    } else if (index === 11) {
      this.setState({
        passDownInfo12: info
      });  
    } else if (index === 12) {
      this.setState({
        passDownInfo13: info
      });  
    } else if (index === 13) {
      this.setState({
        passDownInfo14: info
      });  
    } else if (index === 14) {
      this.setState({
        passDownInfo15: info
      });  
    } else if (index === 15) {
      this.setState({
        passDownInfo16: info
      });  
    } else if (index === 16) {
      this.setState({
        passDownInfo17: info
      });  
    } else if (index === 17) {
      this.setState({
        passDownInfo18: info
      });  
    } else if (index === 18) {
      this.setState({
        passDownInfo19: info
      });  
    } else if (index === 19) {
      this.setState({
        passDownInfo20: info
      });  
    }
    
    console.log(this.state.passDownInfo,this.state.passDownInfo2, 'passdowninfo log');
  }

  nextScreen() {
    if (Object.keys(this.state).length === 1) {
          // Make an error message saying you must select someone and give them a fob or card
    } else {
      var infoObj = {};
      for (k in this.state) {
        if (k !== 'users') {
          infoObj[k] = this.state[k];
        }
      }
      this.props.navigation.navigate("Step2", {params: infoObj});  
      // this.props.navigation.navigate("Step2", {params: this.state.passDownInfo});  
    }
  }

  render() {
    let showUser;
    if (this.state.showUser) {
      showUser = <Image source={require('../../img/up-arrow.png')} style={{height: 20, width: 20}}/>;
    } else {
      showUser = <Image source={require('../../img/angle-arrow-down.png')} style={{height: 20, width: 20}}/>;
    }
    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Service")} style={{width: 50, paddingLeft:20}}>
              <Image source={require('../../img/back.png')} style={{width: 25, height: 25}}/>
            </TouchableOpacity>
            <View style={styles.center}>
              <Text style={styles.headerText}>Order Key Cards/FOBs</Text>
            </View>
            <TouchableOpacity style={{width: 50, padding: 5, marginRight: 10}} onPress={() => this.nextScreen()}>
              <Text style={{color: 'white', fontSize: 18}}>Next</Text>
            </TouchableOpacity>
          </View>

          <View style={{width: '100%', padding: 40, paddingBottom: 0, flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 18}}>Step 1</Text>
            <Text style={{ color: 'black', fontSize: 18}}>    Select Card/Fob</Text>
          </View>
          <View style={{width: '100%', padding: 40, paddingTop: 0, paddingBottom: 0}}>
            <Image source={require('../../img/step_one.png')} resizeMode="contain" style={{width: '100%'}}/>
          </View>
          <View style={{width: '100%', padding: 40, paddingTop: 0, paddingBottom: 15}}>
            <Text style={{ color: 'black', fontSize: 18}}>Dear user, You will always be the card/fob owner. Below you must choose a card/fob user. Please note when selecting a card for yourself, only You will be the card/fob owner and the card/fob user.</Text>
          </View>

          <View style={{width: '100%', paddingHorizontal: 60, flexDirection: 'row'}}>
            <TouchableOpacity style={{backgroundColor: '#BA2745', borderRadius: 22, width: 130, height: 50, alignItems: 'center', flexDirection: 'row'}} onPress={() => this.props.navigation.navigate("AddPerson")}>
              <View style={{paddingLeft: 10, paddingRight: 10}}>
                <Image source={require('../../img/add-plus-button.png')} style={{height: 18, width: 18}}/>
              </View>
              <Text style={{color: 'white', fontSize: 22}}>Person</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: '#BA2745', borderRadius: 22, width: 130, height: 50, alignItems: 'center', flexDirection: 'row', marginLeft: 20}} onPress={() => this.props.navigation.navigate("AddDelivery")}>
              <View style={{paddingLeft: 10, paddingRight: 10}}>
                <Image source={require('../../img/add-plus-button.png')} style={{height: 18, width: 18}}/>
              </View>
              <Text style={{color: 'white', fontSize: 22}}>Delivery</Text>
            </TouchableOpacity>
          </View>
          <View style={{paddingHorizontal: 50, width: '100%', paddingTop: 20, flex: 1}}>
            <ScrollView style={{flex: 1}}>
              {this.state.users.map((user, index) => (
                  <ArrowSwitch user={user} key={index} keyz={index} passDownInfo={this.passDownInfo}/>
              ))} 
            </ScrollView>
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
    backgroundColor: '#BA2745',
    flexDirection: 'row'
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  center: {
    justifyContent : 'center',
    alignItems: 'center',
    flex: 1
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#BA2745'
  }
});