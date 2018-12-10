import React, { Component } from 'react';
import { StyleSheet, Platform, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView, Alert, AsyncStorage } from 'react-native';
import Axios from 'axios';


export default class KeyCard4Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

    this.processOrder = this.processOrder.bind(this);
    this._retrieveData = this._retrieveData.bind(this);
  }


  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserInfo');
      if (value !== null) {
        let isTrue = JSON.parse(value);
        if (isTrue) {
          console.log('values for user', isTrue);
        console.log(isTrue)
          this.setState({
            buildingInfo: isTrue
          });
          // isTrue[0].buildingInfo
          // isTrue[0].apartmentInfo.NUM

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




  processOrder() {
    let shippingCost;
    let tax = this.state.tax;
    let product;
    let accessKey = '';
    if (this.props.navigation.state.params.step3.shippingOption === 'FedEX') {
      shippingCost = 12;
    } else if (this.props.navigation.state.params.step3.shippingOption === 'overnight') {
      shippingCost = 30;
    } else if (this.props.navigation.state.params.step3.shippingOption === 'usps') {
      shippingCost = 6;
    } else if (this.props.navigation.state.params.step3.shippingOption === 'pickup') {
      shippingCost = 0;
    }
    let total = '' + (tax + shippingCost + this.state.cost);
    if (this.props.navigation.state.params.step12.step1.card === true) {
      product = "Key Card";
    } else {
      product = 'Key Fob';
    }
    if (this.props.navigation.state.params.step12.step1.packageRoom === false) {
      accessKey += 'Accesss to package room';
    }
    if (this.props.navigation.state.params.step12.step1.frontDoor === false) {
      accessKey += 'Accesss to front door';
    }
    //product: product, accessKey: accessKey, forUser: this.props.navigation.state.params.step12.step1.user
    console.log('hello screen4 ' , this.props.navigation.state.params);
      Axios.post('http://104.248.110.70:3000/chargecreditcard', {nameoncard: this.props.navigation.state.params.step3.nameoncard, cardNum: this.props.navigation.state.params.step3.cardNum, 
      cvv: this.props.navigation.state.params.step3.cvv, cardExperation: this.props.navigation.state.params.step3.cardExperation, shippingCost: ('' + shippingCost), taxes: ('' + this.state.tax), total:total, 
      billFirst: this.props.navigation.state.params.step3.first, billLast:this.props.navigation.state.params.step3.last, billAddress: this.props.navigation.state.params.step3.address, billCity: this.props.navigation.state.params.step3.city, billState: this.props.navigation.state.params.step3.stateLive, billzipCode: this.props.navigation.state.params.step3.zipCode,
      shipFirst: this.props.navigation.state.params.step12.step2.shipName.split(" ")[0], shipLast: this.props.navigation.state.params.step12.step2.shipName.split(" ")[1], shipAddress: (this.props.navigation.state.params.step12.step2.shipAddress1 + ' ' + this.props.navigation.state.params.step12.step2.shipAddress2), shipCity: this.props.navigation.state.params.step12.step2.shipCity, 
      shipState: this.props.navigation.state.params.step12.step2.shipState, shipZipCode: this.props.navigation.state.params.step12.step2.shipZipCode, product: this.props.navigation.state.params.step12.step1, cost: this.state.cost, buildingInfo: this.state.buildingInfo})
        .then((res) => {
          if (res.data === 'success') {
            console.log(res.data, 'cc response');
            Alert.alert('Payment Processed!');
            this.props.navigation.navigate("Home");
          } else {
            console.log(res.data, 'cc failed response');
            Alert.alert('This transaction has been declined.');
          }
        }).catch((err) => {
          console.log(err);
        });

  }

  componentWillMount(){
    console.log('hello screen4 ' , this.props.navigation.state.params);
    this._retrieveData();
    var cost = Object.keys(this.props.navigation.state.params.step12.step1).length * 25;
    var tax = Math.round(cost * 8.875) / 100;
    this.setState({
      cost: cost,
      tax : tax
    });
  }

  render() {
    let shipCost;

    if (this.props.navigation.state.params.step3.shippingOption === 'FedEX') {
      shipCost = 12;
    } else if (this.props.navigation.state.params.step3.shippingOption === 'overnight') {
      shipCost = 30;
    } else if (this.props.navigation.state.params.step3.shippingOption === 'usps') {
      shipCost = 6;
    } else if (this.props.navigation.state.params.step3.shippingOption === 'pickup') {
      shipCost = 10;
    }
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
            <TouchableOpacity style={{width: 60, padding: 5, marginRight: 0}} onPress={() => this.processOrder()}>
              <Text style={{color: 'white', fontSize: 18}}>Order</Text>
            </TouchableOpacity>
          </View>

          <View style={{width: '100%', padding: 40, paddingBottom: 0, flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 18}}>Step 4</Text>
            <Text style={{ color: 'black', fontSize: 18}}>    Place Order</Text>
          </View>
          <View style={{width: '100%', padding: 40, paddingTop: 0, paddingBottom: 0}}>
            <Image source={require('../../img/step_four.png')} resizeMode="contain" style={{width: '100%'}}/>
          </View>

        <ScrollView>
          <View style={{width: '90%', marginLeft: '5%', padding: 5}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>Order Summary</Text>
          </View>


        {Object.keys(this.props.navigation.state.params.step12.step1).map((keys, index) => (
          <View style={{width: '90%', marginLeft: '5%', backgroundColor: 'lightgrey', padding: 5}} key={index}>
            <View style={{paddingLeft: 10}}>
              <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>{this.props.navigation.state.params.step12.step1[keys].card ? <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>Key Card</Text>: <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>Key Fob</Text>} for:  {this.props.navigation.state.params.step12.step1[keys].user} </Text>
            </View>
            <View style={{paddingLeft: 20}}>
              {!this.props.navigation.state.params.step12.step1[keys].packageRoom ? <Text></Text>: <View style={{padding:3, paddingLeft: 0, flexDirection: 'row', alignItems: 'center'}}><Image source={require('../../img/checkmark.png')} style={{width: 16, height: 16, marginRight: 5}}/><Text style={{fontSize: 16, color: 'black'}}>Allows Package Room Access</Text></View>}  
              {!this.props.navigation.state.params.step12.step1[keys].frontDoor ? <Text></Text> : <View style={{padding:3, paddingLeft: 0, flexDirection: 'row', alignItems: 'center'}}><Image source={require('../../img/checkmark.png')} style={{width: 16, height: 16,marginRight: 5}}/><Text style={{fontSize: 16, color: 'black'}}>Allows Front Door Access</Text></View>}
            </View>
          </View> 
        ))}


          {/* <View style={{width: '90%', marginLeft: '5%', backgroundColor: 'lightgrey', padding: 5}}>
            <View style={{paddingLeft: 10}}>
              <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>{this.props.navigation.state.params.step12.step1.card ? <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>Key Card</Text>: <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>Key Fob</Text>} for:  {this.props.navigation.state.params.step12.step1.user} </Text>
            </View>
            <View style={{paddingLeft: 20}}>
              {this.props.navigation.state.params.step12.step1.packageRoom ? <Text></Text>: <View style={{padding:3, paddingLeft: 0, flexDirection: 'row', alignItems: 'center'}}><Image source={require('../../img/checkmark.png')} style={{width: 16, height: 16, marginRight: 5}}/><Text style={{fontSize: 16, color: 'black'}}>Allows Package Room Access</Text></View>}  
              {this.props.navigation.state.params.step12.step1.frontDoor ? <Text></Text> : <View style={{padding:3, paddingLeft: 0, flexDirection: 'row', alignItems: 'center'}}><Image source={require('../../img/checkmark.png')} style={{width: 16, height: 16,marginRight: 5}}/><Text style={{fontSize: 16, color: 'black'}}>Allows Front Door Access</Text></View>}
            </View>
          </View> */}

          <View style={{width: '90%', marginLeft: '5%', padding: 5}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>Ships to</Text>
          </View>
          <View style={{width: '90%', marginLeft: '5%', backgroundColor: 'lightgrey', padding: 5}}>
            <Text style={{fontSize: 16, color: 'black'}}>{this.props.navigation.state.params.step12.step2.shipName}</Text>
            <Text style={{fontSize: 16, color: 'black'}}>{this.props.navigation.state.params.step12.step2.shipAddress1}, {this.props.navigation.state.params.step12.step2.shipAddress2}</Text>
            <Text style={{fontSize: 16, color: 'black'}}>{this.props.navigation.state.params.step12.step2.shipCity}, {this.props.navigation.state.params.step12.step2.shipState} {this.props.navigation.state.params.step12.step2.shipZipCode}</Text>
          </View>


          <View style={{width: '90%', marginLeft: '5%', padding: 5}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>Bills to</Text>
          </View>
          <View style={{width: '90%', marginLeft: '5%', backgroundColor: 'lightgrey', padding: 5}}>
            <Text style={{fontSize: 16, color: 'black'}}>{this.props.navigation.state.params.step3.first} {this.props.navigation.state.params.step3.last}</Text>
            <Text style={{fontSize: 16, color: 'black'}}>{this.props.navigation.state.params.step3.address},</Text>
            <Text style={{fontSize: 16, color: 'black'}}>{this.props.navigation.state.params.step3.city}, {this.props.navigation.state.params.step3.stateLive} {this.props.navigation.state.params.step3.zipCode}</Text>
          </View>

          <View style={{width: '90%', marginLeft: '5%'}}>
            <View style={{flexDirection: 'row', paddingVertical: 5}}>
              <View style={{justifyContent:'center'}}>
                <Text style={{fontSize: 18, color: 'black'}}>Items: ({Object.keys(this.props.navigation.state.params.step12.step1).length})</Text>
              </View>
              <View style={{flex: 1}}></View>
              <View style={{justifyContent:'center'}}> 
                <Text style={{fontSize: 18, color: 'black'}}>${this.state.cost}</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', paddingVertical: 5}}>
              <View style={{justifyContent:'center'}}>
                <Text style={{fontSize: 18, color: 'black'}}>Shipping: {this.props.navigation.state.params.step3.shippingOption}</Text>
              </View>
              <View style={{flex: 1}}></View>
              <View style={{justifyContent:'center'}}> 
                <Text style={{fontSize: 18, color: 'black'}}>${shipCost}</Text>
              </View>
            </View>         

            <View style={{flexDirection: 'row', paddingVertical: 5}}>
              <View style={{justifyContent:'center'}}>
                <Text style={{fontSize: 18, color: 'black'}}>Tax:</Text>
              </View>
              <View style={{flex: 1}}></View>
              <View style={{justifyContent:'center'}}> 
                <Text style={{fontSize: 18, color: 'black'}}>${this.state.tax}</Text>
              </View>
            </View> 

            <View style={{flexDirection: 'row', paddingVertical: 5}}>
              <View style={{justifyContent:'center'}}>
                <Text style={{fontSize: 18, color: 'black'}}>Total:</Text>
              </View>
              <View style={{flex: 1}}></View>
              <View style={{justifyContent:'center'}}> 
                <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>$ {this.state.cost + shipCost + this.state.tax}</Text>
              </View>
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