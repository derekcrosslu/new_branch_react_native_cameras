import React, {Component} from 'react';
import {StyleSheet, Platform, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView, AsyncStorage } from 'react-native';

export default class MyAccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      building: {buildingInfo: [{}], apartmentInfo: [{}]}
    }

    this._retrieveData = this._retrieveData.bind(this);
    this._retrieveUserData = this._retrieveUserData.bind(this);
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserInfo');
      if (value !== null) {
        let isTrue = JSON.parse(value);
        if (isTrue) {
          console.log('111111111111111111111', isTrue, '11111111111111111');
        // console.log(isTrue)
          this.setState({
            building: isTrue
          });
        } else {
          console.log('was not true', value);
        } 
      } else {
        console.log('The key you searched for doesnt exist');
      }
     } catch (error) {
       console.log("there was an error trying to find things in storage or something", error);
     }
  }


  _retrieveUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('Persist');
      if (value !== null) {
        let isTrue = JSON.parse(value);
        if (isTrue) {
          // console.log('values for user', isTrue.userData[0]);
          this.setState({
            user: isTrue.userData[0]
          })
        } else {
          console.log('was not true', value);
        } 
      } else {

        console.log('The key you searched for doesnt exist');
      }
     } catch (error) {
       console.log("there was an error trying to find things in storage or something", error);
     }
  } 




  componentWillMount() {
    this._retrieveData();
    this._retrieveUserData();
  }

  render() {
    let none = 'none';
    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.flex}>
              <View style={{paddingLeft: 20, justifyContent: 'center'}}>
                <Image source={require('../../img/left-arrow.png')} style={{width: 25, height: 25}}/>
              </View>
              <View style={{flex: 1}}></View>
            </TouchableOpacity>

            <View style={styles.flexCity}>
              <Text style={styles.headerText}>My Account</Text>
            </View>

            <View style={styles.flex}>
              <View style={{flex: 1}}></View>
              <TouchableOpacity style={{paddingRight: 20, justifyContent: 'center'}} onPress={() => this.props.navigation.navigate("EditAccount")}>
                <Text style={styles.headerText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.body}>
            <View style={{width: '100%', height: 180, paddingVertical: 15, alignItems: 'center'}}>
              <Image source={require('../../img/user1.png')} style={{width: 150, height: 150}}/>
            </View>

            <View style={{width: '100%', marginTop: 20, marginBottom: 10, flexDirection: 'row', height: 50,  alignItems: 'center', paddingLeft: 20}}>
              <Text style={{fontSize: 26, fontWeight: '600', color: 'black'}}>Personal Information</Text>
            </View>

            <View style={{width: '100%', marginTop: 0, flexDirection: 'row', height: 50,  alignItems: 'center', paddingLeft: 20}}>
              <View>
                <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>Building Name</Text>
                <Text style={{fontSize: 16}}>{this.state.building.buildingInfo[0].NAME} {this.state.building.buildingInfo[0].ADDRESS} {this.state.building.buildingInfo[0].DETAILED_ADDRESS}</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View>
                <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>Apartment Name</Text>
                <Text style={{fontSize: 16}}>{this.state.building.apartmentInfo[0].NUM}</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View>
                <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>Full Name</Text>
                <Text style={{fontSize: 16}}>{this.state.user.FIRST_NAME} {this.state.user.LAST_NAME}</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View>
                <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>Phone</Text>
                <Text style={{fontSize: 16}}>{this.state.user.PHONE}</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View>
                <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>Work Phone</Text>
                <Text style={{fontSize: 16}}>{this.state.user.WORK_PHONE ? this.state.user.WORK_PHONE : 'none'}</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View>
                <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>Cell Phone</Text>
                <Text style={{fontSize: 16}}>{this.state.user.CELL_PHONE ? this.state.user.CELL_PHONE : 'none'}</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View>
                <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>Alternate Phone</Text>
                <Text style={{fontSize: 16}}>{this.state.user.ALT_PHONE ? this.state.user.ALT_PHONE : 'none'}</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View>
                <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>Secret Question</Text>
                <Text style={{fontSize: 16}}>{this.state.user.SECRET_QUESTION}</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View>
                <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>Passcode/Answer</Text>
                <Text style={{fontSize: 16}}>{this.state.user.PASSCODE}</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View>
                <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>Email Address</Text>
                <Text style={{fontSize: 16}}>{this.state.user.EMAIL}</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View>
                <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>Zip Code</Text>
                <Text style={{fontSize: 16}}>{this.state.building.buildingInfo[0].ZIP_CODE}</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, marginBottom: 20, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View>
                <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>Special Instructions</Text>
                <Text style={{fontSize: 16}}>Be nice to the ups guy</Text>
              </View>
            </View>

          </ScrollView>


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
    flexCity: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    flex: {
      flex: 1,
      flexDirection: 'row'
    }
  });