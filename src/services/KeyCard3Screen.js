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

    this.nameRef = this.updateRef.bind(this, 'name');
    this.cardNumberRef = this.updateRef.bind(this, 'cardNumber');
    this.cvvRef = this.updateRef.bind(this, 'cvv');

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
      shippingOption: false
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
    ['name', 'cardNumber', 'cvv']
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


  onSubmit() {
    let errors = {};
    let submitToServer = {};
    
    ['name', 'cardNumber', 'cvv']
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
      });

    this.setState({ errors });
    if (Object.keys(errors).length > 0) {
      console.log(Object.keys(errors).length, 'errors ocurred try again.');
    } else {
      console.log(submitToServer, 'sends to server!');
      // alert("Person added!");
      Alert.alert('Person added!');
      this.props.navigation.goBack();
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

    if (this.state.saveCard) {
      saveCard = 
      <TouchableOpacity style={{padding: 5, paddingRight: 15}} onPress={this.cardSave}>
        <Image source={require('../../img/check.png')} style={{width: 30, height: 30}}/>
      </TouchableOpacity>;
  } else {
      saveCard =
      <TouchableOpacity style={{padding: 5, paddingRight: 18}} onPress={this.cardSave}>
        <Image source={require('../../img/check-box-empty.png')} style={{width: 27, height: 27}}/>
      </TouchableOpacity>;
  }

  if (this.state.shippingOption ==="FexEX") {
    shippingOption =
      <TouchableOpacity style={{padding: 5, paddingRight: 18}} onPress={this.cardSave}>
        <Image source={require('../../img/check-box-empty.png')} style={{width: 27, height: 27}}/>
      </TouchableOpacity>;
  } else if (this.state.shippingOption === "overnight") {

  } else if (this.state.shippingOption === "usps") {

  } else if (this.state.shippingOption === "pickup") {

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
            <TouchableOpacity style={{width: 50, padding: 5, marginRight: 10}} onPress={() => this.props.navigation.navigate("Step4")}>
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
            <Picker
              mode="dropdown"
              selectedValue={this.state.card}
              style={{ height: 60, width: '80%', marginLeft: '10%'}}
              onValueChange={(itemValue, itemIndex) => this.setState({card: itemValue})}>
              <Picker.Item label="New Card" value="New" />
              <Picker.Item label="Existing Card" value="Existing" />
            </Picker>

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

            <View style={{flexDirection: 'row', width: '80%', paddingLeft: '10%'}}>
              <Picker
                mode="dropdown"
                selectedValue={this.state.month}
                style={{ height: 60, width: '50%'}}
                onValueChange={(itemValue, itemIndex) => this.setState({month: itemValue})}>
                <Picker.Item label="Select One" value="Select One" />
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
                onValueChange={(itemValue, itemIndex) => this.setState({currentYear: itemValue})}>
                {this.state.yearArr.map((year, index) => (
                  <Picker.Item label={year} value={year} key={index} />
                ))}
              </Picker>
            </View>
            
            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 25, marginBottom: 15}}>
                  {saveCard}
                  <Text style={{color: 'black', fontSize: 16}}>Save Credit Card</Text>
            </View>

            <View>// NEEDS TO BE COMPLETED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              <View style={{paddingLeft: 25}}>
                <Text style={{fontSize: 16, color: 'black'}}>Select Shipping</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 25}}>
                    {shippingOption}
                    <Text style={{color: 'black', fontSize: 16}}>Save Credit Card</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 25}}>
                    {shippingOption}
                    <Text style={{color: 'black', fontSize: 16}}>Save Credit Card</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 25}}>
                    {shippingOption}
                    <Text style={{color: 'black', fontSize: 16}}>Save Credit Card</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 25}}>
                    {shippingOption}
                    <Text style={{color: 'black', fontSize: 16}}>Save Credit Card</Text>
              </View>
            </View>
          </ScrollView>
          
          {/* <View style={{width: '80%', paddingLeft: '10%'}}>
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
          </View> */}

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