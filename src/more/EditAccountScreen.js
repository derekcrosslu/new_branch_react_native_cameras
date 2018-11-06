import React, {Component} from 'react';
import {StyleSheet, Platform, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView, Alert} from 'react-native';
import { TextField } from 'react-native-material-textfield';

export default class EditAccountScreen extends Component {
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitBuildingName = this.onSubmitBuildingName.bind(this);
    this.onSubmitApartmentName = this.onSubmitApartmentName.bind(this);
    this.onSubmitFullName = this.onSubmitFullName.bind(this);
    this.onSubmitPhoneNum = this.onSubmitPhoneNum.bind(this);
    this.onAccessoryPress = this.onAccessoryPress.bind(this);
    this.onSubmitWorkPhone = this.onSubmitWorkPhone.bind(this);
    this.onSubmitCellPhone = this.onSubmitCellPhone.bind(this);
    this.onSubmitAlternatePhone = this.onSubmitAlternatePhone.bind(this);
    this.onSubmitSecret = this.onSubmitSecret.bind(this);
    this.onSubmitPassCode = this.onSubmitPassCode.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onSubmitZipCode = this.onSubmitZipCode.bind(this);
    this.onSubmitSpecial = this.onSubmitSpecial.bind(this);

    this.BuildingNameRef = this.updateRef.bind(this, 'BuildingName');
    this.ApartmentNameRef = this.updateRef.bind(this, 'ApartmentName');
    this.FullNameRef = this.updateRef.bind(this, 'FullName');
    this.PhoneNumRef = this.updateRef.bind(this, 'PhoneNum');
    this.WorkPhoneRef = this.updateRef.bind(this, 'WorkPhone');
    this.CellPhoneRef = this.updateRef.bind(this, "CellPhone");
    this.AlternatePhoneRef = this.updateRef.bind(this, "AlternatePhone");
    this.SecretRef = this.updateRef.bind(this, 'Secret');
    this.PassCodeRef = this.updateRef.bind(this, "PassCode");
    this.EmailRef = this.updateRef.bind(this, 'Email');
    this.ZipCodeRef = this.updateRef.bind(this, 'ZipCode');
    this.SpecialRef = this.updateRef.bind(this, "Special");

    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

    this.state = {
      BuildingName: '',
      ApartmentName: '',
      FullName: '',
      PhoneNum: '',
      WorkPhone: '',
      CellPhone: '',
      AlternatePhone: '',
      Secret: '',
      PassCode: '',
      Email: '',
      ZipCode: '',
      Special: '',
      secureTextEntry: true
    }
  }

  onFocus() {
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
    ['BuildingName', 'ApartmentName', 'FullName', 'PhoneNum', 'WorkPhone', "CellPhone", "AlternatePhone", "Secret", "PassCode", "Email", "ZipCode", "Special"]
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

  onSubmitBuildingName() {
    this.ApartmentName.focus();
  }

  onSubmitApartmentName() {
    this.FullName.focus();
  }

  onSubmitFullName() {
    this.PhoneNum.focus();
  }

  onSubmitPhoneNum() {
    this.WorkPhone.focus();
  }
  onSubmitWorkPhone() {
    this.CellPhone.focus();
  }
  onSubmitCellPhone() {
    this.AlternatePhone.focus();
  }
  onSubmitAlternatePhone() {
    this.Secret.focus();
  }
  onSubmitSecret() {
    this.PassCode.focus(); 
  }
  onSubmitPassCode() {
    this.Email.focus();
  }
  onSubmitEmail() {
    this.ZipCode.focus();
  }
  onSubmitZipCode() {
    this.Special.focus();
  }
  onSubmitSpecial() {
    this.Special.blur();
  }

  onSubmit() {
    let errors = {};
    let submitToServer = {};
    
    ['BuildingName',  'ApartmentName', 'FullName', 'PhoneNum', 'WorkPhone', "CellPhone", "AlternatePhone", "Secret", "Secret", "PassCode", "Email", "ZipCode", "Special"]
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
      Alert.alert('Account Info Edited!');
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

  render() {
    let { errors = {}, secureTextEntry, ...data } = this.state;
    let { companyname = 'name', phonenum = 'house'} = data;

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
              <Text style={styles.headerText}>Edit Account</Text>
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
                ref={this.BuildingNameRef}
                value={data.BuildingName}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitBuildingName}
                returnKeyType='next'
                label='Building Name'
                error={errors.BuildingName}
                fontSize={20}
                titleFontSize={14}
                labelFontSize={20}
                maxLength={20}
                textColor="black"
                baseColor="black"
                labelTextStyle={{fontWeight: 'bold'}}
              />

              <TextField
                ref={this.ApartmentNameRef}
                value={data.ApartmentName}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitApartmentName}
                returnKeyType='next'
                blurOnSubmit={true}
                label='Apartment Name'
                error={errors.ApartmentName}
                fontSize={20}
                titleFontSize={14}
                labelFontSize={20}
                maxLength={20}
                textColor="black"
                baseColor="black"
                labelTextStyle={{fontWeight: 'bold'}}
              />
  
              <TextField
                ref={this.FullNameRef}
                value={data.FullName}
                defaultValue={''}
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitFullName}
                returnKeyType='next'
                label='Full Name'
                error={errors.FullName}
                fontSize={20}
                titleFontSize={14}
                labelFontSize={20}
                maxLength={20}
                textColor="black"
                baseColor="black"
                labelTextStyle={{fontWeight: 'bold'}}
              />

              <TextField
                ref={this.PhoneNumRef}
                value={data.PhoneNum}
                defaultValue={''}
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitPhoneNum}
                returnKeyType='next'
                label='Phone Number'
                error={errors.PhoneNum}
                fontSize={20}
                titleFontSize={14}
                labelFontSize={20}
                maxLength={20}
                textColor="black"
                baseColor="black"
                labelTextStyle={{fontWeight: 'bold'}}
              />
  
            <TextField
                ref={this.WorkPhoneRef}
                value={data.WorkPhone}
                defaultValue={''}
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitWorkPhone}
                returnKeyType='next'
                label='Work Phone'
                error={errors.WorkPhone}
                fontSize={20}
                titleFontSize={14}
                labelFontSize={20}
                maxLength={20}
                textColor="black"
                baseColor="black"
                labelTextStyle={{fontWeight: 'bold'}}
              />

            <TextField
                ref={this.CellPhoneRef}
                value={data.CellPhone}
                defaultValue={''}
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitCellPhone}
                returnKeyType='next'
                label='Cell Phone'
                error={errors.CellPhone}
                fontSize={20}
                titleFontSize={14}
                labelFontSize={20}
                maxLength={20}
                textColor="black"
                baseColor="black"
                labelTextStyle={{fontWeight: 'bold'}}
              />

            <TextField
                ref={this.AlternatePhoneRef}
                value={data.AlternatePhone}
                defaultValue={''}
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitAlternatePhone}
                returnKeyType='next'
                label='Alternate Phone'
                error={errors.AlternatePhone}
                fontSize={20}
                titleFontSize={14}
                labelFontSize={20}
                maxLength={20}
                textColor="black"
                baseColor="black"
                labelTextStyle={{fontWeight: 'bold'}}
              />

            <TextField
                ref={this.SecretRef}
                value={data.Secret}
                defaultValue={''}
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitSecret}
                returnKeyType='next'
                label='Secret Question'
                error={errors.Secret}
                fontSize={20}
                titleFontSize={14}
                labelFontSize={20}
                maxLength={20}
                textColor="black"
                baseColor="black"
                labelTextStyle={{fontWeight: 'bold'}}
              />

            <TextField
                ref={this.PassCodeRef}
                value={data.PassCode}
                defaultValue={''}
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitPassCode}
                returnKeyType='next'
                label='Passcode/Answer'
                error={errors.PassCode}
                fontSize={20}
                titleFontSize={14}
                labelFontSize={20}
                maxLength={20}
                textColor="black"
                baseColor="black"
                labelTextStyle={{fontWeight: 'bold'}}
              />


            <TextField
                ref={this.EmailRef}
                value={data.Email}
                defaultValue={''}
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitEmail}
                returnKeyType='next'
                label='Email Address'
                error={errors.Email}
                fontSize={20}
                titleFontSize={14}
                labelFontSize={20}
                maxLength={20}
                textColor="black"
                baseColor="black"
                labelTextStyle={{fontWeight: 'bold'}}
              />

            <TextField
                ref={this.ZipCodeRef}
                value={data.ZipCode}
                defaultValue={''}
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitZipCode}
                returnKeyType='next'
                label='Zip Code'
                error={errors.ZipCode}
                fontSize={20}
                titleFontSize={14}
                labelFontSize={20}
                maxLength={20}
                textColor="black"
                baseColor="black"
                labelTextStyle={{fontWeight: 'bold'}}
              />

            <TextField
                ref={this.SpecialRef}
                value={data.Special}
                defaultValue={''}
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitSpecial}
                returnKeyType='next'
                label='Special Instructions'
                error={errors.Special}
                fontSize={20}
                titleFontSize={14}
                labelFontSize={20}
                maxLength={20}
                textColor="black"
                baseColor="black"
                labelTextStyle={{fontWeight: 'bold'}}
              />
  
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
    alignItems: 'center',
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
