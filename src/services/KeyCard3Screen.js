import React, { Component } from 'react';
import { StyleSheet, Platform, SafeAreaView, Text, View, TouchableOpacity, Image, Picker, Alert, ScrollView } from 'react-native';
import { TextField } from 'react-native-material-textfield';

export default class KeyCard3Screen extends Component {
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
    this.onAccessoryPress = this.onAccessoryPress.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.cardSave = this.cardSave.bind(this);

    this.onSubmitname = this.onSubmitname.bind(this);
    this.onSubmitcardNumber = this.onSubmitcardNumber.bind(this);
    this.onSubmitcvv = this.onSubmitcvv.bind(this);

    this.ShipFedex = this.ShipFedex.bind(this);
    this.ShipOvernight = this.ShipOvernight.bind(this);
    this.ShipPickup = this.ShipPickup.bind(this);
    this.ShipUsps = this.ShipUsps.bind(this);

    this.nameRef = this.updateRef.bind(this, 'name');
    this.cardNumberRef = this.updateRef.bind(this, 'cardNumber');
    this.cvvRef = this.updateRef.bind(this, 'cvv');

    this.firstRef = this.updateRef.bind(this, "first");
    this.lastRef = this.updateRef.bind(this, "last");
    this.addressRef = this.updateRef.bind(this, "address");
    this.cityRef = this.updateRef.bind(this, "city");
    this.stateLiveRef = this.updateRef.bind(this, 'stateLive');
    this.zipCodeRef = this.updateRef.bind(this, "zipCode");

    this.onSubmitFirst = this.onSubmitFirst.bind(this);
    this.onSubmitLast = this.onSubmitLast.bind(this);
    this.onSubmitAddress = this.onSubmitAddress.bind(this);
    this.onSubmitCity = this.onSubmitCity.bind(this);
    this.onSubmitStateLive = this.onSubmitStateLive.bind(this);
    this.onSubmitzipCode = this.onSubmitzipCode.bind(this);
    this.selectMonth = this.selectMonth.bind(this);
    this.selectYear = this.selectYear.bind(this);

    this.state = {
      card: "New",
      provider: 'Select Card Type',
      name: "",
      cardNumber: "",
      cvv: "",
      secureTextEntry: true,
      currentYear: '1232',
      yearArr: ["2018"],
      saveCard: false,
      shippingOption: false,
      first: "",
      last: "",
      address: "",
      city: "",
      stateLive: "",
      zipCode: "",
      errors: {},
      listOfStates: ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
    }
  }

  componentWillMount() {
    var d = new Date();
    var currentYear = d.getFullYear();

    var arr = [];
    for (var i = 0; i < 10; i++) {
      arr.push(('' + (currentYear + i)));
    }
    // console.log(currentYear, nextYear, isTrue, "strings and stuccfff", arr);

    this.setState({
      currentYear: currentYear,
      yearArr: arr
    });
    console.log(this.props.navigation.state.params, 'key card 3 screen logs');
  }

  selectMonth(itemValue, itemIndex) {
    let monthNum;
    // onValueChange={(itemValue, itemIndex) => this.setState({month: itemValue, monthIndex: itemIndex})}>
    if (itemIndex < 9) {
      monthNum = '0' + (itemIndex ); 
    } else {
      monthNum = '' + (itemIndex );
    }
    this.setState({month: itemValue, monthIndex: monthNum});
  }

  selectYear(itemValue, itemIndex) {
    // onValueChange={(itemValue, itemIndex) => this.setState({currentYear: itemValue})}>
    let yearNum = itemValue.slice(2);
    this.setState({currentYear: itemValue, theYear: yearNum});
  }

  ShipFedex() {
    this.setState({
      shippingOption: "FedEX"
    });
  }

  ShipOvernight() {
    this.setState({
      shippingOption: "overnight"
    });
  }

  ShipUsps() {
    this.setState({
      shippingOption: "usps"
    });
  }

  ShipPickup() {
    this.setState({
      shippingOption: "pickup"
    });
  }

  cardSave() {
    let oppisite = !this.state.saveCard;
    this.setState({
      saveCard: oppisite
    })
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
    ['name', 'cardNumber', 'cvv', 'first','last', 'address', 'city', 'stateLive', 'zipCode']
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

  onSubmitname() {
    this.cardNumber.focus();
  }

  onSubmitcardNumber() {
    this.cvv.focus();
  }

  onSubmitcvv() {
    this.cvv.blur();
  }

  onSubmitFirst() {
    this.last.focus();
  }

  onSubmitLast() {
    this.address.focus();
  }

  onSubmitAddress() {
    this.city.focus();
  }

  onSubmitCity() {
    this.stateLive.focus();
  }

  onSubmitStateLive() {
    this.zipCode.focus();
  }

  onSubmitzipCode() {
    this.zipCode.blur();
  }

  onSubmit() {
    let errors = {};
    let submitToServer = {};
    
    ['name', 'cardNumber', 'cvv', 'first','last', 'address', 'city', 'stateLive', 'zipCode']
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
        if (this.state.shippingOption === false) {
          errors["shippingOption"] = "Select Shipping Method!";
        }
        if (!this.state.theYear) {
          errors["expirationMonth"] = "Select Credit Cards expiration date!";
        }
        if (!this.state.monthIndex) {
          errors["expirationMonth"] = "Select Credit Cards expiration date!";
        }
      });

    this.setState({ errors });
    if (Object.keys(errors).length > 0) {
      console.log(Object.keys(errors).length, 'errors ocurred try again.');
    } else {
      console.log(submitToServer, 'sends to server!');
      // alert("Person added!");
      // Alert.alert('Person added!');
      // this.props.navigation.goBack();

      this.props.navigation.navigate("Step4", {step12: this.props.navigation.state.params, step3: {nameoncard: this.state.name, cardNum: this.state.cardNumber, cvv: this.state.cvv, first: this.state.first, last: this.state.last, address: this.state.address, city: this.state.city, stateLive: this.state.stateLive, zipCode: this.state.zipCode, shippingOption: this.state.shippingOption, cardExperation: (this.state.monthIndex + this.state.theYear) }});
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
    let { name = 'name', cardNumber = 'house'} = data;
    let saveCard;
    let shippingOption;
    let fedex;
    let overnight;
    let usps;
    let pickup;

    if (this.state.saveCard) {
      saveCard = 
      <TouchableOpacity style={{padding: 5, paddingRight: 15}} onPress={this.cardSave}>
        <Image source={require('../../img/check.png')} style={{width: 30, height: 30}}/>
      </TouchableOpacity>;
  } else {
      saveCard =
      <TouchableOpacity style={{padding: 5, paddingRight: 15}} onPress={this.cardSave}>
        <Image source={require('../../img/check-box-empty.png')} style={{width: 30, height: 30}}/>
      </TouchableOpacity>;
  }

  if (this.state.shippingOption ==="FedEX") {
    fedex =
      <TouchableOpacity style={{padding: 5, paddingRight: 18}} onPress={this.ShipFedex}>
        <Image source={require('../../img/filled-circle.png')} style={{width: 22, height: 22}}/>
      </TouchableOpacity>;
    overnight =
      <TouchableOpacity style={{padding: 5, paddingRight: 18}} onPress={this.ShipOvernight}>
        <Image source={require('../../img/emptycircle.png')} style={{width: 22, height: 22}}/>
      </TouchableOpacity>;
    usps =
      <TouchableOpacity style={{padding: 5, paddingRight: 18}} onPress={this.ShipUsps}>
        <Image source={require('../../img/emptycircle.png')} style={{width: 22, height: 22}}/>
      </TouchableOpacity>;
    pickup =
      <TouchableOpacity style={{padding: 5, paddingRight: 18}} onPress={this.ShipPickup}>
        <Image source={require('../../img/emptycircle.png')} style={{width: 22, height: 22}}/>
      </TouchableOpacity>;
  } else if (this.state.shippingOption === "overnight") {
    fedex =
      <TouchableOpacity style={{padding: 5, paddingRight: 18}} onPress={this.ShipFedex}>
        <Image source={require('../../img/emptycircle.png')} style={{width: 22, height: 22}}/>
      </TouchableOpacity>;
    overnight =
      <TouchableOpacity style={{padding: 5, paddingRight: 18}} onPress={this.ShipOvernight}>
        <Image source={require('../../img/filled-circle.png')} style={{width: 22, height: 22}}/>
      </TouchableOpacity>;
    usps =
      <TouchableOpacity style={{padding: 5, paddingRight: 18}} onPress={this.ShipUsps}>
        <Image source={require('../../img/emptycircle.png')} style={{width: 22, height: 22}}/>
      </TouchableOpacity>;
    pickup =
      <TouchableOpacity style={{padding: 5, paddingRight: 18}} onPress={this.ShipPickup}>
        <Image source={require('../../img/emptycircle.png')} style={{width: 22, height: 22}}/>
      </TouchableOpacity>;
  } else if (this.state.shippingOption === "usps") {
    fedex =
      <TouchableOpacity style={{padding: 5, paddingRight: 18}} onPress={this.ShipFedex}>
        <Image source={require('../../img/emptycircle.png')} style={{width: 22, height: 22}}/>
      </TouchableOpacity>;
    overnight =
      <TouchableOpacity style={{padding: 5, paddingRight: 18}} onPress={this.ShipOvernight}>
        <Image source={require('../../img/emptycircle.png')} style={{width: 22, height: 22}}/>
      </TouchableOpacity>;
    usps =
      <TouchableOpacity style={{padding: 5, paddingRight: 18}} onPress={this.ShipUsps}>
        <Image source={require('../../img/filled-circle.png')} style={{width: 22, height: 22}}/>
      </TouchableOpacity>;
    pickup =
      <TouchableOpacity style={{padding: 5, paddingRight: 18}} onPress={this.ShipPickup}>
        <Image source={require('../../img/emptycircle.png')} style={{width: 22, height: 22}}/>
      </TouchableOpacity>;
  } else if (this.state.shippingOption === "pickup") {
    fedex =
      <TouchableOpacity style={{padding: 5, paddingRight: 18}} onPress={this.ShipFedex}>
        <Image source={require('../../img/emptycircle.png')} style={{width: 22, height: 22}}/>
      </TouchableOpacity>;
    overnight =
      <TouchableOpacity style={{padding: 5, paddingRight: 18}} onPress={this.ShipOvernight}>
        <Image source={require('../../img/emptycircle.png')} style={{width: 22, height: 22}}/>
      </TouchableOpacity>;
    usps =
      <TouchableOpacity style={{padding: 5, paddingRight: 18}} onPress={this.ShipUsps}>
        <Image source={require('../../img/emptycircle.png')} style={{width: 22, height: 22}}/>
      </TouchableOpacity>;
    pickup =
      <TouchableOpacity style={{padding: 5, paddingRight: 18}} onPress={this.ShipPickup}>
        <Image source={require('../../img/filled-circle.png')} style={{width: 22, height: 22}}/>
      </TouchableOpacity>;
  } else {
    fedex =
      <TouchableOpacity style={{padding: 5, paddingRight: 18}} onPress={this.ShipFedex}>
        <Image source={require('../../img/emptycircle.png')} style={{width: 22, height: 22}}/>
      </TouchableOpacity>;
    overnight =
      <TouchableOpacity style={{padding: 5, paddingRight: 18}} onPress={this.ShipOvernight}>
        <Image source={require('../../img/emptycircle.png')} style={{width: 22, height: 22}}/>
      </TouchableOpacity>;
    usps =
      <TouchableOpacity style={{padding: 5, paddingRight: 18}} onPress={this.ShipUsps}>
        <Image source={require('../../img/emptycircle.png')} style={{width: 22, height: 22}}/>
      </TouchableOpacity>;
    pickup =
      <TouchableOpacity style={{padding: 5, paddingRight: 18}} onPress={this.ShipPickup}>
        <Image source={require('../../img/emptycircle.png')} style={{width: 22, height: 22}}/>
      </TouchableOpacity>;
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
            <TouchableOpacity style={{width: 50, padding: 5, marginRight: 10}} onPress={() => this.onSubmit()}>
              <Text style={{color: 'white', fontSize: 18}}>Next</Text>
            </TouchableOpacity>
          </View>

          <View style={{width: '100%', padding: 40, paddingBottom: 0, flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 18}}>Step 3</Text>
            <Text style={{ color: 'black', fontSize: 18}}>    Enter Billing Information</Text>
          </View>
          <View style={{width: '100%', padding: 40, paddingTop: 0, paddingBottom: 0}}>
            <Image source={require('../../img/step_three.png')} resizeMode="contain" style={{width: '100%'}}/>
          </View>

          
          <ScrollView>
            {/* <Picker
              mode="dropdown"
              selectedValue={this.state.card}
              style={{ height: 60, width: '80%', marginLeft: '10%'}}
              onValueChange={(itemValue, itemIndex) => this.setState({card: itemValue})}>
              <Picker.Item label="New Card" value="New" />
              <Picker.Item label="Existing Card" value="Existing" />
            </Picker> */}

            <Picker
              mode="dropdown"
              selectedValue={this.state.provider}
              style={{ height: 60, width: '80%', marginLeft: '10%', marginTop: 10}}
              onValueChange={(itemValue, itemIndex) => this.setState({provider: itemValue})}>
              <Picker.Item label="Select Card Type" value="Select Card Type" />
              <Picker.Item label="American Express" value="American Express" />
              <Picker.Item label="Discover" value="Discover" />
              <Picker.Item label="Master" value="Master" />
              <Picker.Item label="Vista" value="Vista" />
              <Picker.Item label="Diners Club" value="Diners Club" />
              <Picker.Item label="JCB" value="JCB" />
            </Picker>

            <View style={{width: '80%', paddingLeft: '10%'}}>
              <TextField
                ref={this.nameRef}
                value={data.name}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitname}
                returnKeyType='next'
                label='Name on Card'
                error={errors.name}
                fontSize={20}
                titleFontSize={14}
                labelFontSize={20}
                maxLength={20}
                textColor="black"
                baseColor="black"
                labelTextStyle={{fontWeight: 'bold'}}
              />

              <TextField
                ref={this.cardNumberRef}
                value={data.cardNumber}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitcardNumber}
                returnKeyType='next'
                label='Card Number'
                error={errors.cardNumber}
                fontSize={20}
                titleFontSize={14}
                labelFontSize={20}
                maxLength={30}
                textColor="black"
                baseColor="black"
                labelTextStyle={{fontWeight: 'bold'}}
              />

              <TextField
                ref={this.cvvRef}
                value={data.cvv}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitcvv}
                returnKeyType='next'
                label='CVV'
                error={errors.cvv}
                fontSize={20}
                titleFontSize={14}
                labelFontSize={20}
                maxLength={5}
                textColor="black"
                baseColor="black"
                labelTextStyle={{fontWeight: 'bold'}}
              />
            </View>
            {(this.state.errors.expirationMonth === "Select Credit Cards expiration date!" || this.state.errors.expirationMonth === "Select Credit Cards expiration date!") 
              ? <View style={{paddingLeft: 20}}><Text style={{fontSize: 18, color: 'red', fontWeight: 'bold'}}>{this.state.errors.expirationMonth}</Text></View>
              : <View></View>}
            <View style={{flexDirection: 'row', width: '80%', paddingLeft: '10%'}}>
              <Picker
                mode="dropdown"
                selectedValue={this.state.month}
                style={{ height: 60, width: '50%'}}
                onValueChange={(itemValue, itemIndex) => this.selectMonth( itemValue, itemIndex )}>
                <Picker.Item label="Select Month" value="Select Month" />
                <Picker.Item label="January" value="January" />
                <Picker.Item label="February" value="February" />
                <Picker.Item label="March" value="March" />
                <Picker.Item label="April" value="April" />
                <Picker.Item label="May" value="May" />
                <Picker.Item label="June" value="June" />
                <Picker.Item label="July" value="July" />
                <Picker.Item label="August" value="August" />
                <Picker.Item label="September" value="September" />
                <Picker.Item label="October" value="October" />
                <Picker.Item label="November" value="November" />
                <Picker.Item label="December" value="December" />
              </Picker>

              <Picker
                mode="dropdown"
                selectedValue={this.state.currentYear}
                style={{ height: 60, width: '50%'}}
                onValueChange={(itemValue, itemIndex) => this.selectYear(itemValue, itemIndex)}>
                  <Picker.Item label="Select Year" value="Select Year"/>
                {this.state.yearArr.map((year, index) => (
                  <Picker.Item label={year} value={year} key={index} />
                ))}
              </Picker>
            </View>
            
            {/* <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 25, marginBottom: 15}}>
                  {saveCard}
                  <Text style={{color: 'black', fontSize: 16}}>Save Credit Card</Text>
            </View> */}

            <View>
              <View style={{paddingLeft: 30}}>
                  {this.state.errors.shippingOption ?  
                    <Text style={{fontSize: 20, color: 'red', fontWeight: 'bold'}}>{this.state.errors.shippingOption}</Text>
                  : <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>Select Shipping</Text>}
                {/* <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>Select Shipping</Text> */}
              </View>
              <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginLeft: 25, marginBottom: 3, marginTop: 3}}onPress={this.ShipFedex}>
                    {fedex}
                    <Text style={{color: 'black', fontSize: 16}}>FedEX</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginLeft: 25, marginBottom: 3}} onPress={this.ShipOvernight}>
                    {overnight}
                    <Text style={{color: 'black', fontSize: 16}}>Overnight</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginLeft: 25, marginBottom:3}} onPress={this.ShipUsps}>
                    {usps}
                    <Text style={{color: 'black', fontSize: 16}}>USPS</Text>
              </TouchableOpacity> */}
              <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginLeft: 25, marginBottom:3}} onPress={this.ShipPickup}>
                    {pickup}
                    <Text style={{color: 'black', fontSize: 16}}>Pickup</Text>
              </TouchableOpacity>
            </View>

                      <View style={{paddingTop: 10, paddingLeft: 15}}><Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>Billing Address</Text></View>
          <View style={{width: '80%', paddingLeft: '10%'}}>
            {/* <View style={{paddingTop: 10}}><Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>Billing Address</Text></View> */}
            <TextField
              ref={this.firstRef}
              value={data.first}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitFirst}
              returnKeyType='next'
              label='First Name'
              error={errors.first}
              fontSize={20}
              titleFontSize={14}
              labelFontSize={20}
              maxLength={25}
              textColor="black"
              baseColor="black"
              labelTextStyle={{fontWeight: 'bold'}}
            />
            <TextField
              ref={this.lastRef}
              value={data.last}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitLast}
              returnKeyType='next'
              label='Last Name'
              error={errors.last}
              fontSize={20}
              titleFontSize={14}
              labelFontSize={20}
              maxLength={25}
              textColor="black"
              baseColor="black"
              labelTextStyle={{fontWeight: 'bold'}}
            />
            <TextField
              ref={this.addressRef}
              value={data.address}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitAddress}
              returnKeyType='next'
              label='Address'
              error={errors.address}
              fontSize={20}
              titleFontSize={14}
              labelFontSize={20}
              maxLength={25}
              textColor="black"
              baseColor="black"
              labelTextStyle={{fontWeight: 'bold'}}
            />
            <TextField
              ref={this.cityRef}
              value={data.city}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitCity}
              returnKeyType='next'
              label='City'
              error={errors.city}
              fontSize={20}
              titleFontSize={14}
              labelFontSize={20}
              maxLength={25}
              textColor="black"
              baseColor="black"
              labelTextStyle={{fontWeight: 'bold'}}
            />
            <TextField
              ref={this.stateLiveRef}
              value={data.stateLive}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitStateLive}
              returnKeyType='next'
              label='State'
              error={errors.stateLive}
              fontSize={20}
              titleFontSize={14}
              labelFontSize={20}
              maxLength={25}
              textColor="black"
              baseColor="black"
              labelTextStyle={{fontWeight: 'bold'}}
            />
            <TextField
              ref={this.zipCodeRef}
              value={data.zipCode}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitzipCode}
              returnKeyType='next'
              label='Zip Code'
              error={errors.zipCode}
              fontSize={20}
              titleFontSize={14}
              labelFontSize={20}
              maxLength={25}
              textColor="black"
              baseColor="black"
              labelTextStyle={{fontWeight: 'bold'}}
            />
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