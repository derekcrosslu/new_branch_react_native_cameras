import React, {Component} from 'react';
import { NativeModules,StyleSheet, Platform, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
export default class ServicesScreen extends Component {
  constructor(props) {
    super(props);
    this.emailReport = this.emailReport.bind(this);
    this.emailSuggestion = this.emailSuggestion.bind(this);
    this.emailManager = this.emailManager.bind(this);
  }

  emailReport() {
    let email = 'mailto:jmulder@virtualservice.net?subject=Problem with Resident App';
    Linking.openURL(email).then((url) => {
        if (url) {
          console.log('Initial url is: ' + url);
        }
      }).catch(err => console.error('An error occurred', err));
  }

  emailSuggestion() {
    let email = 'mailto:jmulder@virtualservice.net?subject=Suggestion for Resident App';
    Linking.openURL(email).then((url) => {
        if (url) {
          console.log('Initial url is: ' + url);
        }
      }).catch(err => console.error('An error occurred', err));
  }

  emailManager() {
    let email = 'mailto:jmulder@virtualservice.net?subject=Hello Building Manager';
    Linking.openURL(email).then((url) => {
        if (url) {
          console.log('Initial url is: ' + url);
        }
      }).catch(err => console.error('An error occurred', err));
  }

  render() { 

    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

      <View style={{flex: 1}}>
        
        <View style={styles.header}>
          <Text style={styles.headerText}>Services</Text>
        </View>

        <ScrollView style={{flex: 1}}>
          <TouchableOpacity style={styles.feature} onPress={() => this.props.navigation.navigate("KeyCard")}>
            <Image source={require('../img/image6.png')} style={styles.featureImage}/>
            <View style={styles.featureTextC}>
              <Text style={styles.featureText}>Order Key Cards/Fob</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.feature} onPress={() => {
            NativeModules.RNCameraModule.showCamera();
          }}>
            <Image source={require('../img/oldcamera.jpg')} style={styles.featureImage}/>
            <View style={styles.featureTextC}>
              <Text style={styles.featureText}>Building Cameras</Text>
            </View>
          </TouchableOpacity> 

          <TouchableOpacity style={styles.feature} onPress={() => this.props.navigation.navigate("UnlockDoors")}>
            <Image source={require('../img/doorunlock.jpg')} style={styles.featureImage}/>
            <View style={styles.featureTextC}>
              <Text style={styles.featureText}>Unlock Doors</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.feature} onPress={() => this.props.navigation.navigate("CallSuper")}>
            <Image source={require('../img/phone_icon.png')} style={styles.featureImage}/>
            <View style={styles.featureTextC}>
              <Text style={styles.featureText}>Call My Superintendent</Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity style={styles.feature} onPress={this.emailManager}>
            <Image source={require('../img/mail_icon.png')} style={styles.featureImage}/>
            <View style={styles.featureTextC}>
              <Text style={styles.featureText}>Email My Building Manager</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.feature} onPress={this.emailReport}>
            <Image source={require('../img/problem_icon.png')} style={styles.featureImage}/>
            <View style={styles.featureTextC}>
              <Text style={styles.featureText}>Report a Problem</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.feature} onPress={this.emailSuggestion}> 
            <Image source={require('../img/suggestion_icon.png')} style={styles.featureImage}/>
            <View style={styles.featureTextC}>
              <Text style={styles.featureText}>Suggestions</Text>
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

          <TouchableOpacity style={{width: '25%',  alignItems: 'center', justifyContent: 'center', backgroundColor: '#dbdbdb', borderColor: 'black', borderRightWidth: .3}} onPress={() => this.props.navigation.navigate("Service")}>
            <Image source={require('../img/building.png')} resizeMode="contain" style={{width: "25%"}}/>
            <Text style={{fontSize: 16, color: "#BA2745"}}>Services</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{width: '25%',  alignItems: 'center', justifyContent: 'center', backgroundColor: '#ededed'}} onPress={() => this.props.navigation.navigate("More")}>
            <Image source={require('../img/more(1).png')} resizeMode="contain" style={{width: "29%"}}/>
            <Text style={{fontSize: 14, color: "black"}}>More</Text>
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
    height: 80,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1.2, 
    borderColor: '#dbdbdb',
    paddingLeft: 20,
    alignItems: 'center'
  },
  featureLast: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingLeft: 20,
    alignItems: 'center'
  },
  featureText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold'
  },
  featureImage: {
    width: 50, 
    height: 50
  },
  featureTextC: {
    flex: 1, 
    paddingLeft: 20
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#BA2745'
  }
});