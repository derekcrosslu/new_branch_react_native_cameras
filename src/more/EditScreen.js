import React, {Component} from 'react';
import {StyleSheet, Platform, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView, TextInput, Alert} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CustomFilterDays from './CustomFilterDays';
import OpacityBackGround from '../OpacityBackGround';

export default class EditScreen extends Component {
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitFirstName = this.onSubmitFirstName.bind(this);
    this.onSubmitLastName = this.onSubmitLastName.bind(this);
    this.onSubmitAbout = this.onSubmitAbout.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);
    this.onAccessoryPress = this.onAccessoryPress.bind(this);

    this.firstnameRef = this.updateRef.bind(this, 'firstname');
    this.lastnameRef = this.updateRef.bind(this, 'lastname');
    this.phonenumRef = this.updateRef.bind(this, 'phonenum');
    this.secretRef = this.updateRef.bind(this, 'secret');
    this.passcodeRef = this.updateRef.bind(this, 'passcode');

    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
    this.filterOn = this.filterOn.bind(this);

    this.state = {
        firstname: '',
        lastname: '',
        about: '',
        secureTextEntry: true,
        Permissions: 'anyday',
        PermissionsTime: 'anytime',
        isDateTimePickerVisible: false,
        isDateTimePickerVisible2: false,
        isDateTimePickerVisible3: false,
        isDateTimePickerVisible4: false,
        date1: "Start Date",
        date2: "End Date",
        date3: "Start Time",
        date4: "End Time",
        filter: false
      };
  }


  filterOn() {
    let opp = !this.state.filter;
    this.setState({
      filter: opp
    });
  }

  onFocus() {
    console.log('onFocus Ran!');

    let { errors = {} } = this.state;

    for (let name in errors) {
      let ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }

    this.setState({ errors });
  }

  onChangeText(text) {
    console.log('onChangeText Ran!');
    ['firstname', 'lastname', 'phonenum', 'secret', 'passcode']
      .map((name) => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          this.setState({ [name]: text });
        }
      });
  }

  onAccessoryPress() {
    this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
  }

  onSubmitFirstName() {
    this.lastname.focus();
  }

  onSubmitLastName() {
    this.phonenum.focus();
  }

  onSubmitAbout() {
    this.secret.focus();
  }

  onSubmitEmail() {
    this.passcode.focus();
  }

  onSubmitPassword() {
    this.passcode.blur();
  }

  onSubmit() {
    let errors = {};
    let submitToServer = {};
    
    ['firstname', 'lastname', 'phonenum', 'secret', 'passcode']
      .forEach((name) => {
        let value = this[name].value();
        submitToServer[name] = value;
        if (!value) {
          errors[name] = 'Should not be empty';
        } else {
          if ('passcode' === name && value.length < 6) {
            errors[name] = 'Too short';
          }
        }
      });

    this.setState({ errors });
    if (Object.keys(errors).length > 0) {
      console.log(Object.keys(errors).length, 'errors ocurred try again.');
    } else {
      console.log(submitToServer, 'sends to server!');
      // alert("Person added!");
      Alert.alert('Guest Info Edited!');
      this.props.navigation.goBack();
    }
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  renderPasswordAccessory() {
    let { secureTextEntry } = this.state;

    let name = secureTextEntry?
      'visibility':
      'visibility-off';

  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _hideDateTimePickerD = (date) => this.setState({ isDateTimePickerVisible: false, date1: date });

  _handleDatePicked = (date) => {
    let month = date.getMonth();
    let day = date.getDate();
    let year = date.getFullYear();
    let SelectedDate = '' + (month + 1) + '/' + day + '/' + ('' + year).slice(2);
    this._hideDateTimePickerD(SelectedDate);
  };

  _hideDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: false });

  _hideDateTimePickerD2 = (date) => this.setState({ isDateTimePickerVisible2: false, date2: date });

  _handleDatePicked2 = (date) => {
    let month = date.getMonth();
    let day = date.getDate();
    let year = date.getFullYear();
    let SelectedDate = '' + (month + 1) + '/' + day + '/' + ('' + year).slice(2);
    this._hideDateTimePickerD2(SelectedDate);
  };

  _hideDateTimePicker3 = () => this.setState({ isDateTimePickerVisible3: false });

  _hideDateTimePickerD3 = (time) => this.setState({ isDateTimePickerVisible3: false, date3: time });

  _handleDatePicked3 = (date) => {
    let time;

    if (Number(date.toLocaleTimeString().slice(0, 2)) === 0) {
      if ( Number(date.toLocaleTimeString().slice(3, 5)) >= 10 ) {
        time = 12 + ":" + Number(date.toLocaleTimeString().slice(3, 5)) + 'AM';
      } else {
        time = 12 + ":" + 0 + Number(date.toLocaleTimeString().slice(3, 5)) + 'AM';
      }
    } else if (Number(date.toLocaleTimeString().slice(0, 2)) < 12) {
      if ( Number(date.toLocaleTimeString().slice(3, 5)) >= 10 ) {
        time = Number(date.toLocaleTimeString().slice(0, 2)) + ":" + Number(date.toLocaleTimeString().slice(3, 5)) + 'AM';
      } else {
        time = Number(date.toLocaleTimeString().slice(0, 2)) + ":" + 0 + Number(date.toLocaleTimeString().slice(3, 5)) + 'AM';
      }
    } else if (Number(date.toLocaleTimeString().slice(0, 2)) === 12) {
      if ( Number(date.toLocaleTimeString().slice(3, 5)) >= 10 ) {
        time = Number(date.toLocaleTimeString().slice(0, 2)) + ":" + Number(date.toLocaleTimeString().slice(3, 5)) + 'PM';
      } else {
        time = Number(date.toLocaleTimeString().slice(0, 2)) + ":" + 0 + Number(date.toLocaleTimeString().slice(3, 5)) + 'PM';  
      }
    } else if (Number(date.toLocaleTimeString().slice(0, 2)) >= 13) {
      if ( Number(date.toLocaleTimeString().slice(3, 5)) >= 10 ) {
        time = (Number(date.toLocaleTimeString().slice(0, 2)) -12) + ":" + Number(date.toLocaleTimeString().slice(3, 5)) + 'PM';
      } else {
        time = (Number(date.toLocaleTimeString().slice(0, 2)) -12) + ":" + 0 + Number(date.toLocaleTimeString().slice(3, 5)) + 'PM';
      }
    }

    this._hideDateTimePickerD3(time);
  };

  _hideDateTimePicker4 = () => this.setState({ isDateTimePickerVisible4: false });

  _hideDateTimePickerD4 = (time) => this.setState({ isDateTimePickerVisible4: false, date4: time });

  _handleDatePicked4 = (date) => {
    let time;
    console.log('thing', date.toLocaleTimeString());

    if (Number(date.toLocaleTimeString().slice(0, 2)) === 0) {
      if ( Number(date.toLocaleTimeString().slice(3, 5)) >= 10 ) {
        time = 12 + ":" + Number(date.toLocaleTimeString().slice(3, 5)) + 'AM';
      } else {
        time = 12 + ":" + 0 + Number(date.toLocaleTimeString().slice(3, 5)) + 'AM';
      }
    } else if (Number(date.toLocaleTimeString().slice(0, 2)) < 12) {
      if ( Number(date.toLocaleTimeString().slice(3, 5)) >= 10 ) {
        time = Number(date.toLocaleTimeString().slice(0, 2)) + ":" + Number(date.toLocaleTimeString().slice(3, 5)) + 'AM';
      } else {
        time = Number(date.toLocaleTimeString().slice(0, 2)) + ":" + 0 + Number(date.toLocaleTimeString().slice(3, 5)) + 'AM';
      }
    } else if (Number(date.toLocaleTimeString().slice(0, 2)) === 12) {
      if ( Number(date.toLocaleTimeString().slice(3, 5)) >= 10 ) {
        time = Number(date.toLocaleTimeString().slice(0, 2)) + ":" + Number(date.toLocaleTimeString().slice(3, 5)) + 'PM';
      } else {
        time = Number(date.toLocaleTimeString().slice(0, 2)) + ":" + 0 + Number(date.toLocaleTimeString().slice(3, 5)) + 'PM';  
      }
    } else if (Number(date.toLocaleTimeString().slice(0, 2)) >= 13) {
      if ( Number(date.toLocaleTimeString().slice(3, 5)) >= 10 ) {
        time = (Number(date.toLocaleTimeString().slice(0, 2)) -12) + ":" + Number(date.toLocaleTimeString().slice(3, 5)) + 'PM';
      } else {
        time = (Number(date.toLocaleTimeString().slice(0, 2)) -12) + ":" + 0 + Number(date.toLocaleTimeString().slice(3, 5)) + 'PM';
      }
    }

    this._hideDateTimePickerD4(time);
  };

  render() {
    let { errors = {}, secureTextEntry, ...data } = this.state;
    let { firstname = 'name', lastname = 'house'} = data;

    let DaysOfWeek;
    let AnyDay;
    let DatePeriod;
    let AnyTime;
    let SpecificTime;
    var d = new Date();
    let dF = new Date(2025, 2, 22);


    if (this.state.Permissions === 'anyday') {
      AnyDay = <Image source={require('../../img/filled-circle.png')} style={{width: 25, height: 25}}/>;
      DatePeriod = <Image source={require('../../img/emptycircle.png')} style={{width: 25, height: 25}}/>;
      DaysOfWeek = <Image source={require('../../img/emptycircle.png')} style={{width: 25, height: 25}}/>;
    } else if (this.state.Permissions === 'DaysOfWeek') {
      DaysOfWeek = <Image source={require('../../img/filled-circle.png')} style={{width: 25, height: 25}}/>;
      DatePeriod = <Image source={require('../../img/emptycircle.png')} style={{width: 25, height: 25}}/>;
      AnyDay = <Image source={require('../../img/emptycircle.png')} style={{width: 25, height: 25}}/>; 
    } else if (this.state.Permissions === 'DatePeriod') {
      DatePeriod = <Image source={require('../../img/filled-circle.png')} style={{width: 25, height: 25}}/>;
      AnyDay = <Image source={require('../../img/emptycircle.png')} style={{width: 25, height: 25}}/>;
      DaysOfWeek = <Image source={require('../../img/emptycircle.png')} style={{width: 25, height: 25}}/>;
    }

    if (this.state.PermissionsTime === 'anytime') {
      SpecificTime = <Image source={require('../../img/emptycircle.png')} style={{width: 25, height: 25}}/>;
      AnyTime = <Image source={require('../../img/filled-circle.png')} style={{width: 25, height: 25}}/>;
    } else if ( this.state.PermissionsTime === 'SpecifiedTime') {
      AnyTime = <Image source={require('../../img/emptycircle.png')} style={{width: 25, height: 25}}/>;
      SpecificTime = <Image source={require('../../img/filled-circle.png')} style={{width: 25, height: 25}}/>;
    }
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
                        <Text style={styles.headerText}>Edit Guest</Text>
                    </View>

                    <View style={styles.flex}>
                    <View style={{flex: 1}}></View>
                    <TouchableOpacity style={{paddingRight: 20, justifyContent: 'center'}} onPress={this.onSubmit}>
                        <Text style={styles.headerText}>Save</Text>
                    </TouchableOpacity>
                    </View>
                </View>

<ScrollView keyboardShouldPersistTaps='handled'>

<View style={{width: '100%', height: 180, paddingVertical: 15, alignItems: 'center'}}>
  <Image source={require('../../img/user1.png')} style={{width: 150, height: 150}}/>
</View>

<View style={{width: '90%', justifyContent: 'center', paddingLeft: '10%'}}>
  <TextField
    ref={this.firstnameRef}
    value={data.firstname}
    autoCorrect={false}
    enablesReturnKeyAutomatically={true}
    onFocus={this.onFocus}
    onChangeText={this.onChangeText}
    onSubmitEditing={this.onSubmitFirstName}
    returnKeyType='next'
    label='First Name'
    error={errors.firstname}
    fontSize={20}
    titleFontSize={14}
    labelFontSize={20}
    maxLength={20}
    textColor="black"
    baseColor="black"
    labelTextStyle={{fontWeight: 'bold'}}
  />

  <TextField
    ref={this.lastnameRef}
    value={data.lastname}
    autoCorrect={false}
    enablesReturnKeyAutomatically={true}
    onFocus={this.onFocus}
    onChangeText={this.onChangeText}
    onSubmitEditing={this.onSubmitLastName}
    returnKeyType='next'
    label='Last Name'
    error={errors.lastname}
    fontSize={20}
    titleFontSize={14}
    labelFontSize={20}
    maxLength={20}
    textColor="black"
    baseColor="black"
    labelTextStyle={{fontWeight: 'bold'}}
  />

  <TextField
    ref={this.phonenumRef}
    value={data.phonenum}
    onFocus={this.onFocus}
    onChangeText={this.onChangeText}
    onSubmitEditing={this.onSubmitAbout}
    returnKeyType='next'
    blurOnSubmit={true}
    label='Phone Number'
    error={errors.phonenum}
    fontSize={20}
    titleFontSize={14}
    labelFontSize={20}
    maxLength={20}
    textColor="black"
    baseColor="black"
    labelTextStyle={{fontWeight: 'bold'}}
  />

  <TextField
    ref={this.secretRef}
    value={data.email}
    defaultValue={''}
    autoCapitalize='none'
    autoCorrect={false}
    enablesReturnKeyAutomatically={true}
    onFocus={this.onFocus}
    onChangeText={this.onChangeText}
    onSubmitEditing={this.onSubmitEmail}
    returnKeyType='next'
    label='Secret Question'
    error={errors.secret}
    fontSize={20}
    titleFontSize={14}
    labelFontSize={20}
    maxLength={20}
    textColor="black"
    baseColor="black"
    labelTextStyle={{fontWeight: 'bold'}}
  />

  <TextField
    ref={this.passcodeRef}
    value={data.passcode}
    secureTextEntry={secureTextEntry}
    autoCapitalize='none'
    autoCorrect={false}
    enablesReturnKeyAutomatically={true}
    clearTextOnFocus={true}
    onFocus={this.onFocus}
    onChangeText={this.onChangeText}
    onSubmitEditing={this.onSubmitPassword}
    returnKeyType='done'
    label='Passcode'
    error={errors.passcode}
    maxLength={30}
    characterRestriction={20}
    renderAccessory={this.renderPasswordAccessory}
    fontSize={20}
    titleFontSize={14}
    labelFontSize={20}
    maxLength={20}
    textColor="black"
    baseColor="black"
    labelTextStyle={{fontWeight: 'bold'}}
  />

</View>

<View style={{paddingTop: 20, paddingLeft: '10%'}}> 
  <View >
    <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>Permission Type</Text>
  </View>
  <TouchableOpacity style={{flexDirection: 'row',padding: 5, paddingLeft: 0, margin: 5, marginLeft: 0, marginBottom: 0}} onPress={() => this.setState({Permissions: 'anyday'})}>
    {AnyDay}
    <View style={{paddingLeft: 10}}>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>Any Day</Text>
    </View>
  </TouchableOpacity>

  <TouchableOpacity style={{flexDirection: 'row',padding: 5,  paddingLeft: 0, margin: 5, marginLeft: 0}} onPress={() => this.setState({Permissions: 'DatePeriod'})}>
    {DatePeriod}
    <View style={{paddingLeft: 10}}>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>Date Period</Text>
    </View>
    {this.state.Permissions === 'DatePeriod' ?
    <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={() => this.setState({ isDateTimePickerVisible: true })} style={{paddingLeft: 10}}>
        <Text style={{fontWeight: 'bold', textDecorationLine: 'underline', color: 'blue'}}>{this.state.date1}</Text>
      </TouchableOpacity> 
        <View style={{paddingHorizontal: 5}}>
            <Text>to</Text>
        </View>
      <TouchableOpacity onPress={() => this.setState({ isDateTimePickerVisible2: true })} >
        <Text style={{fontWeight: 'bold', textDecorationLine: 'underline', color: 'blue'}}>{this.state.date2}</Text>
      </TouchableOpacity> 
    </View>
      : <View></View>}
  </TouchableOpacity>


  <TouchableOpacity style={{flexDirection: 'row',padding: 5, paddingLeft: 0, margin: 5, marginLeft: 0, marginBottom: 0}} onPress={() => this.setState({Permissions: 'DaysOfWeek'})}>
    {DaysOfWeek}
    <View style={{paddingLeft: 10}}>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>Days of Week</Text>
    </View>
    {this.state.Permissions === 'DaysOfWeek' ?
    <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={() => this.setState({filter: true})} style={{paddingLeft: 20}}>
        <Text style={{fontWeight: 'bold', textDecorationLine: 'underline', color: 'blue'}}>Select Days</Text>
      </TouchableOpacity>
    </View>
      : <View></View>}
  </TouchableOpacity>
</View>

<View style={{paddingTop: 20, paddingLeft: '10%', paddingBottom: 20}}> 
  <View >
    <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>Time of Day</Text>
  </View>
  <TouchableOpacity style={{flexDirection: 'row',padding: 5, paddingLeft: 0, margin: 5, marginLeft: 0, marginBottom: 0}} onPress={() => this.setState({PermissionsTime: 'anytime'})}>
    {AnyTime}
    <View style={{paddingLeft: 10}}>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>Any Time</Text>
    </View>

  </TouchableOpacity>

  <TouchableOpacity style={{flexDirection: 'row',padding: 5,  paddingLeft: 0, margin: 5, marginLeft: 0}} onPress={() => this.setState({PermissionsTime: 'SpecifiedTime'})}>
    {SpecificTime}
    <View style={{paddingLeft: 10}}>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>Specified Time</Text>
    </View>
    { this.state.PermissionsTime === "SpecifiedTime" ? 
            <View style={{flexDirection: "row"}}>
              <TouchableOpacity onPress={() => this.setState({ isDateTimePickerVisible3: true })} style={{paddingLeft: 10}}>
                <Text style={{fontWeight: 'bold', textDecorationLine: 'underline', color: 'blue'}}>{this.state.date3}</Text>
              </TouchableOpacity>
                <View style={{paddingHorizontal: 5}}>
                    <Text>to</Text>
                </View>
              <TouchableOpacity onPress={() => this.setState({ isDateTimePickerVisible4: true })} >
                <Text style={{fontWeight: 'bold', textDecorationLine: 'underline', color: 'blue'}}>{this.state.date4}</Text>
              </TouchableOpacity> 
            </View>
    : <View></View>}
  </TouchableOpacity>

</View>


</ScrollView>

{this.state.filter ? <CustomFilterDays goBack={this.filterOn}/> : <View></View>}
{this.state.filter ? <OpacityBackGround goBack={this.filterOn}/> : <View></View>}
<DateTimePicker
isVisible={this.state.isDateTimePickerVisible}
onConfirm={this._handleDatePicked}
onCancel={this._hideDateTimePicker}
minimumDate={d}
maximumDate={dF}
/>  
<DateTimePicker
isVisible={this.state.isDateTimePickerVisible2}
onConfirm={this._handleDatePicked2}
onCancel={this._hideDateTimePicker2}
minimumDate={d}
maximumDate={dF}
/> 
<DateTimePicker
isVisible={this.state.isDateTimePickerVisible3}
onConfirm={this._handleDatePicked3}
onCancel={this._hideDateTimePicker3}
mode="time"
is24Hour={false}
/>  
<DateTimePicker
isVisible={this.state.isDateTimePickerVisible4}
onConfirm={this._handleDatePicked4}
onCancel={this._hideDateTimePicker4}
mode="time"
is24Hour={false}
/>  
            </View>
        </SafeAreaView>
        )
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