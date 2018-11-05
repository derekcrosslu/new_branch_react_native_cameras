import React, {Component} from 'react';
import { StyleSheet, Platform, Text, View, TouchableOpacity, Image } from 'react-native';
import { TextField } from 'react-native-material-textfield';

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
    }
  }

  onFocus() {
    // console.log('onFocus Ran!');

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
    // console.log('onChangeText Ran!');
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
        let submitToServer = {};
  
        ['username', 'password']
          .forEach((name) => {
            let value = this[name].value();
            submitToServer[name] = value;
            if (!value) {
              errors[name] = 'Should not be empty';
            } else {
              if ('password' === name && value.length < 6) {
                errors[name] = 'Too short';
              }
            }
          });

          this.setState({ errors });
          if (Object.keys(errors).length > 0) {
            console.log(Object.keys(errors).length, 'errors ocurred try again.');
          } else {
            console.log(submitToServer, 'sends to server!');
            this.props.login();
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

    return (
      <View style={styles.container}>

        <View style={{width: '100%', height: '35%', justifyContent:'center', alignItems: 'center'}}>
          <Image source={require('../img/ic_launcher.png')}/>
        </View>

        <View style={{flex: 1, alignItems: 'center'}}>

          <View 
            keyboardShouldPersistTaps='handled'
            style={{width: '80%', paddingTop: Platform.OS === 'ios' ? 0 : 50}}
          >
                {/* <View style={{backgroundColor: 'white', borderRadius: 20}}> */}
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
                  maxLength={20}
                  characterRestriction={20}
                  textColor="white"
                  tintColor="white"
                  baseColor="white"
                  errorColor="black"
                  labelTextStyle={{fontWeight: 'bold'}}
                />
                {/* </View> */}
                {/* <View style={{backgroundColor: 'white', borderRadius: 20}}> */}
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
                {/* </View> */}
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
  

  
// let styles = {
//     scroll: {
//       backgroundColor: '#E8EAF6',
//     },
  
//     container: {
//       margin: 8,
//       marginTop: 24,
//     },
  
//     contentContainer: {
//       padding: 8,
//     },
//   };