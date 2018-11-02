import React, {Component} from 'react';
import {StyleSheet, Platform, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import { TextField } from 'react-native-material-textfield';

export default class testScreen2 extends Component {
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
  
        this.state = {
          firstname: '',
          lastname: '',
          about: '',
          secureTextEntry: true,
        };
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
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps='handled'
          >
            <View style={styles.container}>
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
              />
  
              <TextField
                ref={this.phonenumRef}
                value={data.phonenum}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitAbout}
                returnKeyType='next'
                // multiline={true}
                blurOnSubmit={true}
                label='Phone Number'
                characterRestriction={140}
                error={errors.phonenum}
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
                title='Choose wisely'
                maxLength={30}
                characterRestriction={20}
                renderAccessory={this.renderPasswordAccessory}
              />
  

            </View>
  
            <View style={styles.container}>
              <TouchableOpacity onPress={this.onSubmit} title='submit' color={TextField.defaultProps.tintColor} titleColor='white'>
                <Text>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        );
      }
    }
  
let styles = {
    scroll: {
      backgroundColor: '#E8EAF6',
    },
  
    container: {
      margin: 8,
      marginTop: 24,
    },
  
    contentContainer: {
      padding: 8,
    },
  };