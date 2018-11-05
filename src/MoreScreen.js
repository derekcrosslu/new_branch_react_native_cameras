import React, {Component} from 'react';
import {StyleSheet, Platform, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';

export default class MoreScreen extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    // console.log(ToastExample, 'Toast Example');
    // ToastExample.show('Added ', ToastExample.LONG);
  }

  render() { 
    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <View style={{flex: 1}}>
          <View style={styles.header}>
            <Text style={styles.headerText}>More</Text>
            <View style={{flex: 1}}></View>
            <TouchableOpacity style={{paddingRight: 20}} onPress={this.props.screenProps.logOut}>
              <Text style={styles.headerText}>Logout</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.account}>
            <View style={{margin: 15, marginLeft: 25}}>
              <Image source={require('../img/user.png')} style={{width: 70, height: 70}}/>
            </View>
            <TouchableOpacity style={{paddingLeft: 20, height: 100, justifyContent: 'center', flex: 1}} onPress={() => this.props.navigation.navigate("account")}>
              <Text>
                <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>Joseph Mulder</Text>{"\n"}
                <Text style={{fontSize: 14, fontWeight: '400'}}>View Account Details</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{alignItems: 'center', height: 100, justifyContent: 'center', paddingLeft: '5%', paddingRight: '5%'}} onPress={this.props.screenProps.logOut}>
              {/* <Text style={{fontSize: 22, fontWeight: '600', color: '#BA2745'}}>Logout</Text> */}
            </TouchableOpacity>
          </View>

          <ScrollView style={{flex: 1}}>
            <TouchableOpacity style={styles.feature} onPress={() => this.props.navigation.navigate("Arrivals")}>
              <View style={{flex: 1}}>
                <Text style={styles.featureText}>Arrivals</Text>
              </View>
              <View style={{paddingRight: 10}}>
                <Image source={require('../img/ic_arrow_right_40_10.png')}/>
              </View>
            </TouchableOpacity>  

            <TouchableOpacity style={styles.feature} onPress={() => this.props.navigation.navigate("AddPerson")}>
              <View style={{flex: 1}}>
                <Text style={styles.featureText}>Add New Person</Text>
              </View>
              <View style={{paddingRight: 10}}>
                <Image source={require('../img/ic_arrow_right_40_10.png')}/>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.feature} onPress={() => this.props.navigation.navigate("AddDelivery")}>
              <View style={{flex: 1}}>
                <Text style={styles.featureText}>Add New Delivery</Text>
              </View>
              <View style={{paddingRight: 10}}>
                <Image source={require('../img/ic_arrow_right_40_10.png')}/>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.feature} onPress={() => this.props.navigation.navigate("About")}>
              <View style={{flex: 1}}>
                <Text style={styles.featureText}>About</Text>
              </View>
              <View style={{paddingRight: 10}}>
                <Image source={require('../img/ic_arrow_right_40_10.png')}/>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.feature} onPress={() => this.props.navigation.navigate("ChangePassword")}>
              <View style={{flex: 1}}>
                <Text style={styles.featureText}>Change Password</Text>
              </View>
              <View style={{paddingRight: 10}}>
                <Image source={require('../img/ic_arrow_right_40_10.png')}/>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.feature} onPress={() => this.props.navigation.navigate("Settings")}>
              <View style={{flex: 1}}>
                <Text style={styles.featureText}>Settings</Text>
              </View>
              <View style={{paddingRight: 10}}>
                <Image source={require('../img/ic_arrow_right_40_10.png')}/>
              </View>
            </TouchableOpacity>

          </ScrollView>

      </View>



        <View style={{flexDirection: 'row', height: '10%', borderTopWidth: .8, borderColor: 'grey'}}>
          <TouchableOpacity style={{width: '25%',  alignItems: 'center', justifyContent: 'center', backgroundColor: '#ededed', borderColor: 'black', borderRightWidth: .3}} onPress={() => this.props.navigation.navigate("Home")}>
            <Image source={require('../img/speaking(1).png')} resizeMode="contain" style={{width: "34%"}}/>
            <Text style={{fontSize: 14, color: "black"}}>Intercom</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{width: '25%',  alignItems: 'center', justifyContent: 'center', backgroundColor: '#ededed', borderColor: 'black', borderRightWidth: .3}} onPress={() => this.props.navigation.navigate("Logs")}>
            <Image source={require('../img/list-with-dots(1).png')} resizeMode="contain" style={{width: "25%"}}/>
            <Text style={{fontSize: 14, color: "black"}}>Logs</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{width: '25%',  alignItems: 'center', justifyContent: 'center', backgroundColor: '#ededed', borderColor: 'black', borderRightWidth: .3}} onPress={() => this.props.navigation.navigate("Service")}>
            <Image source={require('../img/building(1).png')} resizeMode="contain" style={{width: "25%"}}/>
            <Text style={{fontSize: 14, color: "black"}}>Services</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{width: '25%',  alignItems: 'center', justifyContent: 'center', backgroundColor: '#dbdbdb'}} onPress={() => this.props.navigation.navigate("More")}>
            <Image source={require('../img/more.png')} resizeMode="contain" style={{width: "29%"}}/>
            <Text style={{fontSize: 16, color: "#BA2745"}}>More</Text>
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
  feature: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1.2, 
    borderColor: '#dbdbdb',
    paddingLeft: 20,
    alignItems: 'center'
  },
  featureLast: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingLeft: 20,
    alignItems: 'center'
  },
  featureText: {
    fontSize: 22,
    color: 'black'
  },
  account: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
    borderBottomWidth: 1.0,
    borderColor: 'lightgrey'
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#BA2745'
  }
});