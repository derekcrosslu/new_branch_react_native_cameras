import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, Platform, Text, View, TouchableOpacity, Image, StatusBar, AsyncStorage } from 'react-native';
import axios from 'axios';

export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

    this.getNvr = this.getNvr.bind(this);
    this._retrieveData = this._retrieveData.bind(this);
    this.saveUserInfo = this.saveUserInfo.bind(this);
    this.saveUserInfo2 = this.saveUserInfo2.bind(this);
  }

  componentWillMount() {
    this._retrieveData();
    
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('Persist');
      if (value !== null) {
        let isTrue = JSON.parse(value);
        if (isTrue) {
          // console.log('values for user', isTrue.userData[0]);
          axios.get('http://104.248.110.70:3000/getbuildinginfo', {params: {id: isTrue.userData[0].ID}})
            .then((res) => {
              var buildingID = res.data[0].BUILDING_ID;
              var apartmentID = res.data[0].APARTMENT_ID;
              // console.log(res.data, apartmentID,buildingID, 'building info response');
              // console.log(res.data[0].PERSON_ID, 'this is the person ID'); //save res.data[0] need this information for users who have permission to person nevermind it is saved below just 
              //just need to remeber where it is saved and use that info to find those people's profile definetely going to need to use join
              axios.get('http://104.248.110.70:3000/guestsdeliveries', {params: {id: res.data[0].PERSON_ID}}) //res.data[0].PERSON_ID
                .then((rez) => {
                  // console.log(rez.data, 'guest delivery date');
                })
                .catch((err) => {
                  console.log(err);
                });


              axios.get('http://104.248.110.70:3000/guestinfo', {params: {personId: res.data[0].PERSON_ID}}) 
                .then((res1) => {
                  console.log(res1.data, 'guest info people only');
                  this.saveUserInfo2(res1.data.results, res1.data.results2)
                })
                .catch((err) => {
                  console.log(err);
                });  

              axios.get('http://104.248.110.70:3000/buildinginfo', {params: {id: buildingID}})
                .then((response) => {
                  // console.log('hello',response.data, 'hello');
                  // this.saveUserInfo(res.data, response.data);

                  axios.get('http://104.248.110.70:3000/apartmentnum', {params: {id: apartmentID}})
                    .then((apartmentRes) => {
                      // console.log(apartmentRes.data, "Apartmeßnt info");
                      this.saveUserInfo(res.data, response.data, apartmentRes.data);

                    })
                    .catch((error) => {
                      console.log(error);
                    })
                })
                .catch((err) => {
                  console.log(err);
                });

            })
            .catch((err) => {
              console.log(err);
            });
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


  saveUserInfo(data, moreData, apartmentInfo) {
    let UserInfo = {accountInfo: data, buildingInfo: moreData, apartmentInfo: apartmentInfo};
    _storeData = async () => {
      try {
        await AsyncStorage.setItem('UserInfo', JSON.stringify(UserInfo));
        console.log("user info was saved!");
      } catch (error) {
        console.log('There was an error!', error);
      }
    }
    _storeData(); 
  }

  saveUserInfo2(guests, companies) {
    let Guests = {guests: guests, companies: companies};
    _storeData2 = async () => {
      try {
        await AsyncStorage.setItem('GuestInfo', JSON.stringify(Guests));
        console.log("Guest info was save!!");
      } catch (error) {
        console.log('There was an error!', error);
      }
    }
    _storeData2(); 
  }


  getNvr() {
      axios.get('http://96.239.60.172:9002')
      .then((res) => {
        console.log(res, 'nvr response');
      })
      .catch((err) => {
        console.log(err, 'error with nvr request');
      })
  }

  render() {

    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
     
          <StatusBar
               backgroundColor="#840e26"
               barStyle="light-content"
          />
        <View style={{flex: 1}}>

          <View style={styles.header}>
            <Text style={styles.headerText}>Intercom</Text>
          </View>

          <View style={{width: '100%', justifyContent: 'center', height: 70, paddingLeft: 20}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>Please select the station you want to call</Text>
          </View>

          <TouchableOpacity style={{padding: 10, paddingLeft: 20, borderBottomWidth: 1.2, borderColor: '#dbdbdb', flexDirection: 'row'}} onPress={() => this.props.navigation.navigate("intercom", {"location": "Kitchen"})}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>1. Kitchen</Text>
            </View>
            <View style={{paddingRight: 20}}>
              <Image source={require('../img/telephone-handle-silhouette.png')} style={{width: 20, height: 20}}/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{padding: 10, paddingLeft: 20, borderBottomWidth: 1.2, borderColor: '#dbdbdb', flexDirection: 'row'}} onPress={() => this.props.navigation.navigate("intercom", {"location": "Lobby"})}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>2. Lobby</Text>
            </View>
            <View style={{paddingRight: 20}}>
              <Image source={require('../img/telephone-handle-silhouette.png')} style={{width: 20, height: 20}}/>
            </View>
          </TouchableOpacity>

        {/* <View elevation={5} style={styles.buttonContainer}>
          <Text style={styles.textStyle}>Shadow Applied</Text>
        </View>
        */}

        </View>
        
        <View style={{flexDirection: 'row', height: '10%', borderTopWidth: .8, borderColor: 'grey'}}>
          <TouchableOpacity style={{width: '25%',  alignItems: 'center', justifyContent: 'center', backgroundColor: '#dbdbdb', borderColor: 'black', borderRightWidth: .3}} onPress={() => this.props.navigation.navigate("Home")}>
            <Image source={require('../img/speaking.png')} resizeMode="contain" style={{width: "34%"}}/>
            <Text style={{fontSize: 16, color: "#BA2745"}}>Intercom</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{width: '25%',  alignItems: 'center', justifyContent: 'center', backgroundColor: '#ededed', borderColor: 'black', borderRightWidth: .3}} onPress={() => this.props.navigation.navigate("Logs")}>
            <Image source={require('../img/list-with-dots(1).png')} resizeMode="contain" style={{width: "25%"}}/>
            <Text style={{fontSize: 14, color: "black"}}>Logs</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{width: '25%',  alignItems: 'center', justifyContent: 'center', backgroundColor: '#ededed', borderColor: 'black', borderRightWidth: .3}} onPress={() => this.props.navigation.navigate("Service")}>
            <Image source={require('../img/building(1).png')} resizeMode="contain" style={{width: "25%"}}/>
            <Text style={{fontSize: 14, color: "black"}}>Services</Text>
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
  textStyle: {
    color: '#FFFFFF'
  },
  buttonContainer: {
    marginTop: '10%',
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#BA2745'
  }
});

