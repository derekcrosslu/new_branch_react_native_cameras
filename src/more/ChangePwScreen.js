import React, {Component} from 'react';
import {StyleSheet, Platform, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView, TextInput} from 'react-native';

export default class ChangePwScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old: '',
      newPw: '',
      confirm: ''
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image source={require('../../img/left-arrow.png')} style={{width: 25, height: 25}}/>
            </TouchableOpacity>
            <View style={styles.paddingL}>
              <Text style={styles.headerText}>Change Password</Text>
            </View>
          </View>

          <ScrollView style={styles.body}>

              <View style={{paddingLeft: '10%', paddingBottom: 40, paddingTop: 40}}>
                <Text style={{fontSize: 18, color: 'black'}}>Old Password</Text>
                <TextInput
                        style={{height: 40, borderBottomWidth: 2, borderColor: 'black', width: '80%'}}
                        onChangeText={(old) => this.setState({old})}
                        value={this.state.old}
                />
              </View>
              <View style={{paddingLeft: '10%', paddingBottom: 40}}>
                <Text style={{fontSize: 18, color: 'black'}}>New Password</Text>
                <TextInput
                        style={{height: 40, borderBottomWidth: 2, borderColor: 'black', width: '80%'}}
                        onChangeText={(newPw) => this.setState({newPw})}
                        value={this.state.newPw}
                />
              </View>

              <View style={{paddingLeft: '10%', paddingBottom: 40}}>
                <Text style={{fontSize: 18, color: 'black'}}>Confirm Password</Text>
                <TextInput
                        style={{height: 40, borderBottomWidth: 2, borderColor: 'black', width: '80%'}}
                        onChangeText={(confirm) => this.setState({confirm})}
                        value={this.state.confirm}
                />
              </View>
              <View style={{width: '100%', alignItems: 'center'}}>
                <TouchableOpacity onPress={this.submitNewPerson} style={{width: 150, height: 60, backgroundColor: '#BA2745',alignItems: 'center', justifyContent: 'center', borderRadius: 10}}>
                  <Text style={{fontSize: 26, color: 'white'}}>Submit</Text>
                </TouchableOpacity>
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
    paddingLeft: 20,
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
  }
});