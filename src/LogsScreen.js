import React, {Component} from 'react';
import {StyleSheet, Platform, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView, AsyncStorage} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CustomFilter from './CustomFilter';
import OpacityBackGround from './OpacityBackGround';
import axios from 'axios';

export default class LogsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      date: 'Today',
      filter: false,
      logData: [{OPERATOR_NAME: 'Loading', "TIMESTAMPDIFF(MINUTE, LOGIN_TIME, LAST_UPDATE)": 12 }]
    }
    this.filterOn = this.filterOn.bind(this);
    this.logData = this.logData.bind(this);
    this._retrieveData = this._retrieveData.bind(this);
  }

  componentWillMount() {
    this.logData();
    this._retrieveData();
  }


  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('Persist');
      if (value !== null) {
        let isTrue = JSON.parse(value);
        if (isTrue) {
          console.log('values for user', isTrue.userData[0].ID);
          axios.get('http://104.248.110.70:3000/getbuildinginfo', {params: {id: isTrue.userData[0].ID}})
            .then((res) => {
              var buildingID = res.data[0].BUILDING_ID;
              var apartmentID = res.data[0].APARTMENT_ID;
              console.log(res.data, apartmentID,buildingID, 'building info response');

              axios.get('http://104.248.110.70:3000/buildinginfo', {params: {id: buildingID}})
                .then((res) => {
                  console.log('hello',res.data, 'hello');
                })
                .catch((err) => {
                  console.log(err);
                });

            })
            .catch((err) => {
              console.log(err);
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

  logData() {
    axios.get('http://104.248.110.70:3000/api/logs')
      .then((res) => {
        console.log('log data', res.data);
        this.setState({
          logData: res.data
        });
      })
      .catch((err) => {
        console.log(err, 'error');
      })
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _hideDateTimePickerD = (date) => this.setState({ isDateTimePickerVisible: false, date: date });

  _handleDatePicked = (date) => {
    let month = date.getMonth();
    let day = date.getDate();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let SelectedDate = '' + months[month] + ', ' + day;
    this._hideDateTimePickerD(SelectedDate);
  };

  filterOn() {
    let opp = !this.state.filter;
    this.setState({
      filter: opp
    });
  }

  render() { 
    let Filter;
    let backG;

    if (this.state.filter) {
      Filter = <CustomFilter goBack={this.filterOn}/>;
      backG = <OpacityBackGround goBack={this.filterOn}/>;
    } else {
      Filter = <View></View>
      backG = <View></View>
    }

    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
            {Filter}
            {backG}
        <View style={{flex: 1}}>

          <View style={styles.header}>
            <Text style={styles.headerText}>Logs</Text>
          </View>

          <View style={{flexDirection: 'row', width: '100%'}}>
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={this._showDateTimePicker} style={{flexDirection: 'row', padding: 10, margin: 10}}>
                <Text style={{color: '#BA2745', fontSize: 15, fontWeight: '600' }}>{this.state.date}</Text>
                <View style={{paddingLeft: 10, paddingTop: 2}}>
                  <Image source={require('../img/sort-down.png')} style={{width: 15, height: 15}}/>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity  style={{flexDirection: 'row', padding: 10, margin: 10}} onPress={this.filterOn}>
                <Text style={{color: '#BA2745', fontSize: 15, fontWeight: '600' }}>Filters</Text>
                <View style={{paddingLeft: 10, paddingTop: 2}}>
                  <Image source={require('../img/sort-down.png')} style={{width: 15, height: 15}}/>
                </View>
            </TouchableOpacity>
          </View>

          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />

          <ScrollView style={{flex: 1}}>
            {this.state.logData.map((log, index) => (
                <View style={{paddingTop: 10, paddingLeft : 20, paddingBottom: 10, borderBottomWidth: 1.2, borderColor: '#dbdbdb'}} key={index}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{padding: 5, paddingRight: 10}}>
                      <Image source={require('../img/diagonal-arrow.png')} style={{width: 12, height: 12}}/>
                    </View>
                    <Text style={{color: 'black', fontSize: 14}}>Outgoing to VDM Kitchen 11:18</Text>
                  </View>
                    <Text>Duration: {log["TIMESTAMPDIFF(MINUTE, LOGIN_TIME, LAST_UPDATE)"]}m</Text>
                    <Text style={{color: 'black', fontSize: 14}}>Generated by: {log.OPERATOR_NAME}</Text>
                </View>        
            ))}
            {/* <View style={{paddingTop: 10, paddingLeft : 20, paddingBottom: 10, borderBottomWidth: 1.2, borderColor: '#dbdbdb'}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{padding: 5, paddingRight: 10}}>
                  <Image source={require('../img/diagonal-arrow.png')} style={{width: 12, height: 12}}/>
                </View>
                <Text style={{color: 'black', fontSize: 14}}>Outgoing to VDM Kitchen 11:18</Text>
              </View>
                <Text>Duration: 00.07m</Text>
                <Text style={{color: 'black', fontSize: 14}}>Generated by: Travis Brooks</Text>
            </View> */}

          </ScrollView>

        </View>

        <View style={{flexDirection: 'row', height: '10%', borderTopWidth: .8, borderColor: 'grey'}}>
          <TouchableOpacity style={{width: '25%',  alignItems: 'center', justifyContent: 'center', backgroundColor: '#ededed', borderColor: 'black', borderRightWidth: .3}} onPress={() => this.props.navigation.navigate("Home")}>
            <Image source={require('../img/speaking(1).png')} resizeMode="contain" style={{width: "34%"}}/>
            <Text style={{fontSize: 14, color: "black"}}>Intercom</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{width: '25%',  alignItems: 'center', justifyContent: 'center', backgroundColor: '#dbdbdb', borderColor: 'black', borderRightWidth: .3}} onPress={() => this.props.navigation.navigate("Logs")}>
            <Image source={require('../img/list-with-dots.png')} resizeMode="contain" style={{width: "25%"}}/>
            <Text style={{fontSize: 16, color: "#BA2745"}}>Logs</Text>
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
  safeArea: {
    flex: 1,
    backgroundColor: '#BA2745'
  }
});