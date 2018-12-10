import React, {Component} from 'react';
import {StyleSheet, Platform, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView, Alert, AsyncStorage} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import axios from 'axios';

export default class ChangePwScreen extends Component {
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitOldPw = this.onSubmitOldPw.bind(this);
    this.onSubmitPassWord = this.onSubmitPassWord.bind(this);
    this.onSubmitConfirmPassWord = this.onSubmitConfirmPassWord.bind(this);

    this.OldPwRef = this.updateRef.bind(this, 'OldPw');
    this.PassWordRef = this.updateRef.bind(this, 'PassWord');
    this.ConfirmPassWordRef = this.updateRef.bind(this, 'ConfirmPassWord');
    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
    this._retrieveUserData = this._retrieveUserData.bind(this);
    this.checkPassWord = this.checkPassWord.bind(this);
    this.changePassWord = this.changePassWord.bind(this);


    this.state = {
      OldPw: '',
      PassWord: '',
      ConfirmPassWord: '',
      secureTextEntry: true
    };

  }

  componentWillMount() {
    this._retrieveUserData();
  }

  _retrieveUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('Persist');
      if (value !== null) {
        let isTrue = JSON.parse(value);
        if (isTrue) {
          console.log('CHANGE PASSWORD SCREEN', isTrue.userData[0].ID);
          this.setState({
            userID: isTrue.userData[0].ID,
            email: isTrue.userData[0].EMAIL
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
    ['OldPw', 'PassWord', 'ConfirmPassWord']
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

  onSubmitOldPw() {
    this.PassWord.focus();
  }

  onSubmitPassWord() {
    this.ConfirmPassWord.focus();
  }

  onSubmitConfirmPassWord() {
    this.ConfirmPassWord.blur();
  }

  checkPassWord() {
    let errors = {};
    let wifiMac = 'abc123';
    let password = this["OldPw"].value();
    let userName = this.state.email;

    axios.post(`http://104.248.110.70:3000/api/${userName}/${password}/${wifiMac}`)
    .then((res) => {
      // console.log(res.data, "server response");
      if (res.data === 'invalid username ' ) {
        errors["OldPw"] = "Username is invalid";
      } else if (res.data === 'invalid password') {
        errors["OldPw"] = "Password is invalid";
      }
        console.log(res.data, 'console.log of server response from data');
      this.setState({ errors });
      if (Object.keys(errors).length > 0) {
        console.log(Object.keys(errors).length, 'errors ocurred try again.');
      } else {
        this.changePassWord();
      }
      //put request here that makes the password change to the new one
      // this.changePassWord();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  changePassWord() {
    axios.post(`http://104.248.110.70:3000/changepw`, {id : this.state.userID, new: this.state.PassWord})
      .then((res) => {
        console.log('response', res.data);
        if (res.data === 'Password Changed!') {
          Alert.alert('Password Changed!');
          this.props.navigation.goBack();
        } else {
          Alert.alert('PASSWORD NOT CHANGED!');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onSubmit() {
    let errors = {};
    let submitToServer = {};
    
    ['OldPw', 'PassWord', 'ConfirmPassWord']
      .forEach((name) => {
        let value = this[name].value();
        submitToServer[name] = value;
        if (!value) {
          errors[name] = 'Should not be empty';
        }
        // } else {
        //   if ('OldPw' === name && value.length < 6) {
        //     errors[name] = 'Too short';
        //   }
        //   if ('PassWord' === name && value.length < 6) {
        //     errors[name] = 'Too short';
        //   }
        //   if ('ConfirmPassWord' === name && value.length < 6) {
        //     errors[name] = 'Too short';
        //   }
        // }
      });
      if (submitToServer['PassWord'] !== submitToServer['ConfirmPassWord']) {
        errors['PassWord'] = "Passwords don't match";
        errors['ConfirmPassWord'] = "Passwords don't match";
      }
      
      // if (submitToServer['OldPw'] !== 'cowgoesmoo') {
      //   errors["OldPw"] = "Password is incorrect";
      // }
      // This will be where you check if the password that the user inputs is correct before anything else

    this.setState({ errors });
    if (Object.keys(errors).length > 0) {
      console.log(Object.keys(errors).length, 'errors ocurred try again.');
    } else {
      console.log(submitToServer, 'sends to server!');
      this.checkPassWord();
      // Alert.alert('Password Changed!');
      // this.props.navigation.goBack();
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
    let { OldPw = 'name', PassWord = 'house', ConfirmPassWord = 'confirm'} = data;

    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

          <View style={styles.header}>
            <View >
              <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{paddingLeft: 20}}>
                <Image source={require('../../img/left-arrow.png')} style={{width: 25, height: 25}}/>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, paddingLeft: '16%'}}>
              <Text style={styles.headerText}>Change Password</Text>
            </View>

          </View>

          <ScrollView keyboardShouldPersistTaps='handled'>
            
            <View style={{width: '90%', justifyContent: 'center', paddingLeft: '10%'}}>
              <TextField
                ref={this.OldPwRef}
                value={data.OldPw}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                secureTextEntry={secureTextEntry}
                renderAccessory={this.renderPasswordAccessory}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitOldPw}
                returnKeyType='next'
                label='Old Password'
                error={errors.OldPw}
                fontSize={20}
                titleFontSize={14}
                labelFontSize={20}
                maxLength={20}
                textColor="black"
                baseColor="black"
                labelTextStyle={{fontWeight: 'bold'}}
              />
  
              <TextField
                ref={this.PassWordRef}
                value={data.PassWord}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                secureTextEntry={secureTextEntry}
                renderAccessory={this.renderPasswordAccessory}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitPassWord}
                returnKeyType='next'
                label='Password'
                error={errors.PassWord}
                fontSize={20}
                titleFontSize={14}
                labelFontSize={20}
                maxLength={20}
                textColor="black"
                baseColor="black"
                labelTextStyle={{fontWeight: 'bold'}}
              />
  
              <TextField
                ref={this.ConfirmPassWordRef}
                value={data.ConfirmPassWord}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                secureTextEntry={secureTextEntry}
                renderAccessory={this.renderPasswordAccessory}
                onSubmitEditing={this.onSubmitConfirmPassWord}
                returnKeyType='done'
                blurOnSubmit={true}
                label='Confirm Password'
                error={errors.ConfirmPassWord}
                fontSize={20}
                titleFontSize={14}
                labelFontSize={20}
                maxLength={20}
                textColor="black"
                baseColor="black"
                labelTextStyle={{fontWeight: 'bold'}}
              />
  
              <View style={{width: '100%', alignItems: 'center', marginTop: 50}}>
                <TouchableOpacity onPress={this.submitNewPerson} style={{width: 150, height: 60, backgroundColor: '#BA2745',alignItems: 'center', justifyContent: 'center', borderRadius: 10}} onPress={() => this.onSubmit()}>
                  <Text style={{fontSize: 26, color: 'white'}}>Submit</Text>
                </TouchableOpacity>
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
  flex: {
    flex: 1,
    flexDirection: 'row'
  }
});