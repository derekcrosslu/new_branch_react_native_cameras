import React, {Component} from 'react';
import {StyleSheet, Platform, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';

export default class DeliveryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {CELL_PHONE: '', 'DaysAllowed': 'none', "TimeAllowed": 'none'}
    }
  }

  componentWillMount() {
    this.props.navigation.state.params.delivery
    // console.log( this.props.navigation.state.params.guest.permissions.slice(2, this.props.navigation.state.params.guest.permissions.length -2), "Array with semicolons");
    var guestInfo = this.props.navigation.state.params.delivery.permissions.slice(2, this.props.navigation.state.params.delivery.permissions.length -2);
     guestInfo = guestInfo.split(":");
    console.log(guestInfo, 'the guest split info');
    var result = {};
    for (var i = 0; i < guestInfo.length; i++) {
      if (guestInfo[i] === 'Week Days ') {
        console.log('Week Days Ran');
        result['DaysAllowed'] = guestInfo[i + 1].split(',').join(' ');
      } else if (guestInfo[i] === ' Time Period ') {
        console.log("Time Peroid Ran");
        result["TimeAllowed"] = guestInfo[i + 1].split(',').join(' ');
      } else if (guestInfo[i] === 'Each Day ' || guestInfo[i] === '[ Each Day ') {
        console.log('Each day ran');
        result["DaysAllowed"] = "Any Day";
      } else if (guestInfo[i] === 'Date Period ') {
        console.log('Date Period');
        result["DaysAllowed"] = guestInfo[i + 1].split(',').join(' - ');
      } else if (guestInfo[i] === '  Any Time' || guestInfo[i] === ' Any Time ]') {
        console.log('access all the time ');
        result["TimeAllowed"] = "Any Time";
      }
    }
    // console.log(result, 'THIS IOSI THE RESULT');
    this.setState({result});
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
              <Text style={{fontSize: 18, color: 'black', fontWeight: '600'}}>{this.props.navigation.state.params.delivery.LAST_NAME}</Text>
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
                <Text>{this.props.navigation.state.params.delivery.PHONE === '' ? 'No Number specified': this.props.navigation.state.params.delivery.PHONE}</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View style={{paddingRight: 20}}>
                <Image source={require('../../img/calendar-with-a-clock-time-tools.png')} />
              </View>
              <View>
                <Text style={{fontSize: 18, fontWeight: '600'}}>Entry Permissions</Text>
                <Text>Days    {this.state.result.DaysAllowed}</Text>
                <Text>Time    {this.state.result.TimeAllowed}</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View style={{paddingRight: 20}}>
                <Image source={require('../../img/information.png')} />
              </View>
              <View>
                <Text style={{fontSize: 18, fontWeight: '600'}}>Secret Question</Text>
                <Text>{this.props.navigation.state.params.delivery.SECRET_QUESTION === '' ? 'n/a': this.props.navigation.state.params.delivery.SECRET_QUESTION}</Text>
              </View>
            </View>

            <View style={{width: '100%', marginTop: 10, flexDirection: 'row',  alignItems: 'center', paddingLeft: 20}}>
              <View style={{paddingRight: 20}}>
                <Image source={require('../../img/lock.png')} />
              </View>
              <View>
                <Text style={{fontSize: 18, fontWeight: '600'}}>Passcode</Text>
                <Text>{this.props.navigation.state.params.delivery.PASSCODE === '' ? 'n/a': this.props.navigation.state.params.delivery.PASSCODE}</Text>
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