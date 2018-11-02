import React, {Component} from 'react';
import {StyleSheet, Platform, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';

export default class DeliveryScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.navigation.state.params.delivery)
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
              <Text style={styles.headerText}>Delivery Details</Text>
            </View>

            <View style={styles.flex}>
              <View style={{flex: 1}}></View>
              <TouchableOpacity style={{paddingRight: 20, justifyContent: 'center'}} onPress={() => this.props.navigation.navigate("EditDelivery")}>
                <Text style={styles.headerText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.body}>
            <View style={{width: '100%', height: 180, paddingVertical: 15, alignItems: 'center'}}>
              <Image source={require('../../img/user1.png')} style={{width: 150, height: 150}}/>
              <Text>{this.props.navigation.state.params.guest}</Text>
            </View>

            <TouchableOpacity style={{width: '100%', marginTop: 20, marginBottom: 10, flexDirection: 'row', height: 50,  alignItems: 'center', paddingLeft: 20}}>
              <View style={{paddingRight: 20}}>
                <Image source={require('../../img/star.png')} />
              </View>
              <Text style={{fontSize: 18, fontWeight: '600'}}>Add to Favorites</Text>
            </TouchableOpacity>

            <View style={{width: '100%', marginTop: 0, flexDirection: 'row', height: 50,  alignItems: 'center', paddingLeft: 20}}>
              <View style={{paddingRight: 20}}>
                <Image source={require('../../img/telephone-handle-silhouette.png')} />
              </View>
              <View>
                <Text style={{fontSize: 18, fontWeight: '600'}}>Mobile</Text>
                <Text>No Number specified</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View style={{paddingRight: 20}}>
                <Image source={require('../../img/calendar-with-a-clock-time-tools.png')} />
              </View>
              <View>
                <Text style={{fontSize: 18, fontWeight: '600'}}>Entry Permissions</Text>
                <Text>Days    Each Day</Text>
                <Text>Time    Any Time</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View style={{paddingRight: 20}}>
                <Image source={require('../../img/information.png')} />
              </View>
              <View>
                <Text style={{fontSize: 18, fontWeight: '600'}}>Secret Question</Text>
                <Text>n/a</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View style={{paddingRight: 20}}>
                <Image source={require('../../img/lock.png')} />
              </View>
              <View>
                <Text style={{fontSize: 18, fontWeight: '600'}}>Passcode</Text>
                <Text>n/a</Text>
              </View>
            </View>

            <TouchableOpacity style={{width: '100%', marginTop: 30, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('../../img/waste-bin.png')} style={{width: 50, height: 50}}/>
            </TouchableOpacity>

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
    fontSize: 18,
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