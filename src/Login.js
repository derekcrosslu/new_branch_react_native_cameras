import React, { Component } from 'react';
import { StyleSheet, Platform, Text, View, TouchableOpacity, Image } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitUserName = this.onSubmitUserName.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);
    this.onAccessoryPress = this.onAccessoryPress.bind(this);
  
    this.usernameRef = this.updateRef.bind(this, 'username');
    this.passwordRef = this.updateRef.bind(this, 'password');
  
    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

    this.state = {
        username: '',
        password: '',
        secureTextEntry: true,
        wifiMac: 'Not yet taken'
    }
    this.getDeviceInfo = this.getDeviceInfo.bind(this);
  }

  componentWillMount() {
    this.getDeviceInfo();
  }


  getDeviceInfo(){
    DeviceInfo.getMACAddress().then(mac => {
      this.setState({
        wifiMac: mac
      });
    })
    .catch((error) => {
      console.log(error);
    }); 
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
    ['username', 'password']
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
  
      onSubmitUserName() {
        this.password.focus();
      }


      onSubmitPassword() {
        this.password.blur();
      }

      onSubmit() {
        let errors = {};
        let username = this["username"].value();
        let password = this["password"].value();
        // let wifiMac = this.state.wifiMac;
        let wifiMac = 'abc123';
        // console.log(username, password, wifiMac, "THis is the username and password");

        if (username.length === 0 && password.length === 0) {
          errors["username"] = "Can't leave empty";
          errors["password"] = "Can't leave empty";
          this.setState({ errors });
        } else if (password.length === 0) {
          errors["password"] = "Can't leave empty";
          this.setState({ errors });   
        } else if (username.length === 0) {
          errors["username"] = "Can't leave empty";
          this.setState({ errors });   
        } else {
          axios.post(`http://104.248.110.70:3000/api/${username}/${password}/${wifiMac}`)
            .then((res) => {
              // console.log(res.data, "server response");
              if (res.data === 'invalid username ' ) {
                errors["username"] = "Username is invalid";
              } else if (res.data === 'invalid password') {
                errors["password"] = "Password is invalid";
              } else if (res.data === 'wifimacaddress not registered') {
                errors["wifiMac"] = 'Wifimacaddress not registered';
              }
                console.log(res.data, 'console.log of server response from data');
              this.setState({ errors });
              if (Object.keys(errors).length > 0) {
                console.log(Object.keys(errors).length, 'errors ocurred try again.');
              } else {
                this.props.login(res.data);
              }

            })
            .catch((error) => {
              console.log(error);
            });
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
    let { username = 'name', password = 'house'} = data;
    let rememberMe;
    if (this.props.rememberMe) {
      rememberMe = <Image source={require('../img/switch.png')} style={{width: 50, height: 40}}/>;
    } else {
      rememberMe = <Image source={require('../img/switch2.png')} style={{width: 50, height: 40}}/>;  
    }

    return (
      <View style={styles.container}>

        <View style={{width: '100%', height: '35%', justifyContent:'center', alignItems: 'center'}}>
          <Image source={require('../img/ic_launcher.png')}/>
        </View>

        <View style={{flex: 1, alignItems: 'center'}}>

          <View 
            keyboardShouldPersistTaps='handled'
            style={{width: '80%', paddingTop: Platform.OS === 'ios' ? 0 : 40}}
          >
          <View style={{width: '100%', justifyContent:'center', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{errors.wifiMac}</Text>
          </View>
                <TextField
                  ref={this.usernameRef}
                  value={data.username}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onFocus={this.onFocus}
                  onChangeText={this.onChangeText}
                  onSubmitEditing={this.onSubmitUserName}
                  returnKeyType='next'
                  label='User Name'
                  error={errors.username}
                  fontSize={22}
                  titleFontSize={14}
                  labelFontSize={22}
                  maxLength={40}
                  characterRestriction={40}
                  textColor="white"
                  tintColor="white"
                  baseColor="white"
                  errorColor="black"
                  labelTextStyle={{fontWeight: 'bold'}}
                />

                <TextField
                  ref={this.passwordRef}
                  value={data.password}
                  secureTextEntry={secureTextEntry}
                  autoCapitalize='none'
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  clearTextOnFocus={true}
                  onFocus={this.onFocus}
                  onChangeText={this.onChangeText}
                  onSubmitEditing={this.onSubmitPassword}
                  returnKeyType='done'
                  label='Password'
                  error={errors.password}
                  title=''
                  maxLength={20}
                  characterRestriction={20}
                  renderAccessory={this.renderPasswordAccessory}
                  fontSize={22}
                  titleFontSize={14}
                  labelFontSize={22}
                  textColor="white"
                  tintColor="white"
                  baseColor="white"
                  errorColor="black"
                  labelTextStyle={{fontWeight: 'bold'}}
                />
                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
                  <TouchableOpacity style={{padding: 5, margin: 5}} onPress={this.props.rememberMeChange}>
                    {rememberMe}
                  </TouchableOpacity>

                  <View style={{paddingLeft:5, justifyContent: 'center'}}>
                    <Text style={{fontSize: 18, color: 'white'}}>Remember me</Text>
                  </View>

                  <View style={{flex: 1}}></View>
                </View>

              <View style={{width: '100%', alignItems: 'center'}}>
                <TouchableOpacity style={{width: '70%', height: 60, borderRadius: 20, backgroundColor: 'white', margin: 20, justifyContent: 'center', alignItems: 'center' }} onPress={this.onSubmit} title='submit' color={TextField.defaultProps.tintColor} titleColor='white'>
                  <Text style={{color: 'black', fontWeight: 'bold', fontSize: 26}}>Login</Text>
                </TouchableOpacity>
              </View>

          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#BA2745'
    },
    header: {
      width: 80,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      backgroundColor: 'white',
      margin: 50,
      marginLeft: '40%'
    },
    headerText: {
      fontSize: 20,
      color: 'black'
    }
  });
  
