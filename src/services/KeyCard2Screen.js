import React, { Component } from 'react';
import { StyleSheet, Platform, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { TextField } from 'react-native-material-textfield';

export default class KeyCard2Screen extends Component {
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
    this.onAccessoryPress = this.onAccessoryPress.bind(this);

    this.onSubmitname = this.onSubmitname.bind(this);
    this.onSubmitphone = this.onSubmitphone.bind(this);
    this.onSubmitaddress1 = this.onSubmitaddress1.bind(this);
    this.onSubmitaddress2 = this.onSubmitaddress2.bind(this);
    this.onSubmitcity = this.onSubmitcity.bind(this);
    this.onSubmitstateA = this.onSubmitstateA.bind(this);
    this.onSubmitzipCode = this.onSubmitzipCode.bind(this);

    this.nameRef = this.updateRef.bind(this, 'name');
    this.phoneRef = this.updateRef.bind(this, 'phone');
    this.address1Ref = this.updateRef.bind(this, 'address1');
    this.address2Ref = this.updateRef.bind(this, 'address2');
    this.cityRef = this.updateRef.bind(this, 'city');
    this.stateARef = this.updateRef.bind(this, 'stateA');
    this.zipCodeRef = this.updateRef.bind(this, 'zipCode');


    this.state = {
        name: "",
        phone: "",
        address1: "",
        address2: "",
        city: "",
        stateA: "",
        zipCode: "",
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
    ['name', 'phone', 'address1', 'address2', 'city', "stateA", "zipCode"]
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

  onSubmitname() {
    this.phone.focus();
  }

  onSubmitphone() {
    this.address1.focus();
  }

  onSubmitaddress1() {
    this.address2.focus();
  }

  onSubmitaddress2() {
    this.city.focus();
  }

  onSubmitcity() {
    this.stateA.focus();
  }
  onSubmitstateA() {
    this.zipCode.focus();
  }
  onSubmitzipCode() {
    this.zipCode.blur();
  }

  onSubmit() {
    let errors = {};
    let submitToServer = {};
    
    ['name', 'phone', 'address1', 'address2', 'city', "stateA", "zipCode"]
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
      Alert.alert('Person added!');
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
    let { firstname = 'name', lastname = 'house'} = data;

    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{width: 50, paddingLeft:20}}>
              <Image source={require('../../img/back.png')} style={{width: 25, height: 25}}/>
            </TouchableOpacity>
            <View style={styles.center}>
              <Text style={styles.headerText}>Order Key Cards/FOBs</Text>
            </View>
            <TouchableOpacity style={{width: 50, padding: 5, marginRight: 10}} onPress={() => this.props.navigation.navigate("Step3")}>
              <Text style={{color: 'white', fontSize: 18}}>Next</Text>
            </TouchableOpacity>
          </View>

          <View style={{width: '100%', padding: 40, paddingBottom: 0, flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 18}}>Step 2</Text>
            <Text style={{ color: 'black', fontSize: 18}}>    Enter Shipping Address</Text>
          </View>
          <View style={{width: '100%', padding: 40, paddingTop: 0, paddingBottom: 0}}>
            <Image source={require('../../img/step_two.png')} resizeMode="contain" style={{width: '100%'}}/>
          </View>

            <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={{width: '100%'}}>
                <View style={{width: '90%', paddingLeft: '10%'}}>  
                    <TextField
                        ref={this.nameRef}
                        value={data.name}
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitname}
                        returnKeyType='next'
                        label='Full Name'
                        error={errors.name}
                        fontSize={20}
                        titleFontSize={14}
                        labelFontSize={20}
                        maxLength={20}
                        textColor="black"
                        baseColor="black"
                        labelTextStyle={{fontWeight: 'bold'}}
                    />
        
                    <TextField
                        ref={this.phoneRef}
                        value={data.phone}
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitphone}
                        returnKeyType='next'
                        label='Phone Number'
                        error={errors.phone}
                        fontSize={20}
                        titleFontSize={14}
                        labelFontSize={20}
                        maxLength={20}
                        textColor="black"
                        baseColor="black"
                        labelTextStyle={{fontWeight: 'bold'}}
                    />
        
                    <TextField
                        ref={this.address1Ref}
                        value={data.address1}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitaddress1}
                        returnKeyType='next'
                        blurOnSubmit={true}
                        label='Address 1'
                        error={errors.address1}
                        fontSize={20}
                        titleFontSize={14}
                        labelFontSize={20}
                        maxLength={20}
                        textColor="black"
                        baseColor="black"
                        labelTextStyle={{fontWeight: 'bold'}}
                    />
        
                    <TextField
                        ref={this.address2Ref}
                        value={data.address2}
                        defaultValue={''}
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitaddress2}
                        returnKeyType='next'
                        label='Address 2'
                        error={errors.address2}
                        fontSize={20}
                        titleFontSize={14}
                        labelFontSize={20}
                        maxLength={20}
                        textColor="black"
                        baseColor="black"
                        labelTextStyle={{fontWeight: 'bold'}}
                    />
        
                    <TextField
                        ref={this.cityRef}
                        value={data.city}
                        secureTextEntry={secureTextEntry}
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        clearTextOnFocus={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitcity}
                        returnKeyType='next'
                        label='City'
                        error={errors.city}
                        maxLength={30}
                        renderAccessory={this.renderPasswordAccessory}
                        fontSize={20}
                        titleFontSize={14}
                        labelFontSize={20}
                        maxLength={20}
                        textColor="black"
                        baseColor="black"
                        labelTextStyle={{fontWeight: 'bold'}}
                    />

                    <TextField
                        ref={this.stateARef}
                        value={data.stateA}
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        clearTextOnFocus={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitstateA}
                        returnKeyType='done'
                        label='State'
                        error={errors.stateA}
                        maxLength={30}
                        fontSize={20}
                        titleFontSize={14}
                        labelFontSize={20}
                        textColor="black"
                        baseColor="black"
                        labelTextStyle={{fontWeight: 'bold'}}
                    />

                    <TextField
                        ref={this.zipCodeRef}
                        value={data.zipCode}
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        clearTextOnFocus={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitzipCode}
                        returnKeyType='done'
                        label='Zip Code'
                        error={errors.city}
                        maxLength={30}
                        fontSize={20}
                        titleFontSize={14}
                        labelFontSize={20}
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