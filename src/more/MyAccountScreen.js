import React, {Component} from 'react';
import {StyleSheet, Platform, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';

export default class MyAccountScreen extends Component {
  constructor(props) {
    super(props);

  }

  render() {
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
              <TouchableOpacity style={{paddingRight: 20, justifyContent: 'center'}} onPress={() => this.props.navigation.navigate("Edit")}>
                <Text style={styles.headerText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.body}>
            <View style={{width: '100%', height: 180, paddingVertical: 15, alignItems: 'center'}}>
              <Image source={require('../../img/user1.png')} style={{width: 150, height: 150}}/>
            </View>

            <TouchableOpacity style={{width: '100%', marginTop: 20, marginBottom: 10, flexDirection: 'row', height: 50,  alignItems: 'center', paddingLeft: 20}}>
              <Text style={{fontSize: 24, fontWeight: '600'}}>Personal Information</Text>
            </TouchableOpacity>

            <View style={{width: '100%', marginTop: 0, flexDirection: 'row', height: 50,  alignItems: 'center', paddingLeft: 20}}>

              <View>
                <Text style={{fontSize: 18, fontWeight: '600'}}>Building Name</Text>
                <Text>Building 99 - Virtual Doorman Office 104 West 40th Street</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View>
                <Text style={{fontSize: 18, fontWeight: '600'}}>Apartment Name</Text>
                <Text>1B</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View>
                <Text style={{fontSize: 18, fontWeight: '600'}}>Full Name</Text>
                <Text>Travis Brooks</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View>
                <Text style={{fontSize: 18, fontWeight: '600'}}>Phone</Text>
                <Text>231-534-6346</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View>
                <Text style={{fontSize: 18, fontWeight: '600'}}>Work Phone</Text>
                <Text>231-534-6346</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View>
                <Text style={{fontSize: 18, fontWeight: '600'}}>Cell Phone</Text>
                <Text>231-534-6346</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View>
                <Text style={{fontSize: 18, fontWeight: '600'}}>Alternate Phone</Text>
                <Text>231-534-6346</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View>
                <Text style={{fontSize: 18, fontWeight: '600'}}>Secret Question</Text>
                <Text>Your High School Name</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View>
                <Text style={{fontSize: 18, fontWeight: '600'}}>Passcode/Answer</Text>
                <Text>Bellview</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View>
                <Text style={{fontSize: 18, fontWeight: '600'}}>Email Address</Text>
                <Text>virtualdoormanservice@gmail.com</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View>
                <Text style={{fontSize: 18, fontWeight: '600'}}>Zip Code</Text>
                <Text>00100</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, marginBottom: 20, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View>
                <Text style={{fontSize: 18, fontWeight: '600'}}>Special Instructions</Text>
                <Text>Be nice to the ups guy</Text>
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