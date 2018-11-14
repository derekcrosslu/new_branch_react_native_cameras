import React, { Component } from 'react';
import { StyleSheet, Platform, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import ArrowSwitch from './ArrowSwitch';

export default class KeyCardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: ["Travis Brooks", "Reagan Dean", "Elon Musk", "Other Guy","Jackie Williams", "Joseph Mulder", "Donald Cross"]
    }
    this.changeArrow = this.changeArrow.bind(this);
  }

  changeArrow() {
    let newVar;
    if (this.state.showUser === undefined) {
      newVar = true;
    } else if (this.state.showUser === true) {
      newVar = false;
    } else if (this.state.showUser === false) {
      newVar = true;
    }

    this.setState({
      showUser: newVar
    });
  }

  render() {
    let showUser;
    if (this.state.showUser) {
      showUser = <Image source={require('../../img/up-arrow.png')} style={{height: 20, width: 20}}/>;
    } else {
      showUser = <Image source={require('../../img/angle-arrow-down.png')} style={{height: 20, width: 20}}/>;
    }
    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Service")} style={{width: 50, paddingLeft:20}}>
              <Image source={require('../../img/back.png')} style={{width: 25, height: 25}}/>
            </TouchableOpacity>
            <View style={styles.center}>
              <Text style={styles.headerText}>Order Key Cards/FOBs</Text>
            </View>
            <TouchableOpacity style={{width: 50, padding: 5, marginRight: 10}} onPress={() => this.props.navigation.navigate("Step2")}>
              <Text style={{color: 'white', fontSize: 18}}>Next</Text>
            </TouchableOpacity>
          </View>

          <View style={{width: '100%', padding: 40, paddingBottom: 0, flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 18}}>Step 1</Text>
            <Text style={{ color: 'black', fontSize: 18}}>    Select Card/Fob</Text>
          </View>
          <View style={{width: '100%', padding: 40, paddingTop: 0, paddingBottom: 0}}>
            <Image source={require('../../img/step_one.png')} resizeMode="contain" style={{width: '100%'}}/>
          </View>
          <View style={{width: '100%', padding: 40, paddingTop: 0, paddingBottom: 15}}>
            <Text style={{ color: 'black', fontSize: 18}}>Dear user, You will always be the card/fob owner. Below you must choose a card/fob user. Please note when selecting a card for yourself, only You will be the card/fob owner and the card/fob user.</Text>
          </View>

          <View style={{width: '100%', paddingHorizontal: 60, flexDirection: 'row'}}>
            <TouchableOpacity style={{backgroundColor: '#BA2745', borderRadius: 22, width: 130, height: 50, alignItems: 'center', flexDirection: 'row'}} onPress={() => this.props.navigation.navigate("AddPerson")}>
              <View style={{paddingLeft: 10, paddingRight: 10}}>
                <Image source={require('../../img/add-plus-button.png')} style={{height: 18, width: 18}}/>
              </View>
              <Text style={{color: 'white', fontSize: 22}}>Person</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: '#BA2745', borderRadius: 22, width: 130, height: 50, alignItems: 'center', flexDirection: 'row', marginLeft: 20}} onPress={() => this.props.navigation.navigate("AddDelivery")}>
              <View style={{paddingLeft: 10, paddingRight: 10}}>
                <Image source={require('../../img/add-plus-button.png')} style={{height: 18, width: 18}}/>
              </View>
              <Text style={{color: 'white', fontSize: 22}}>Delivery</Text>
            </TouchableOpacity>
          </View>
          <View style={{paddingHorizontal: 50, width: '100%', paddingTop: 20, flex: 1}}>
            <ScrollView style={{flex: 1}}>
              {this.state.users.map((user, index) => (
                  <ArrowSwitch user={user} key={index}/>
              ))} 
            </ScrollView>
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