import React, { Component } from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';

export default class ArrowSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
        card: false,
        fob: false,
        packageRoom: true,
        frontDoor: true
    }
    this.changeArrow = this.changeArrow.bind(this);
    this.changeCheckBox = this.changeCheckBox.bind(this);
    this.changeSecondBox = this.changeSecondBox.bind(this);
    this.changePackage = this.changePackage.bind(this);
    this.changeFront = this.changeFront.bind(this);
  }

//   componentWillMount() {

//     console.log('props for arrow', this.props);
//   }

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

  changePackage() {
      let opp3 = !this.state.packageRoom;
      this.setState({
          packageRoom: opp3
      },  () => this.props.passDownInfo({card: this.state.card, fob: this.state.fob, packageRoom: !this.state.packageRoom, frontDoor: !this.state.frontDoor, user: this.props.user },this.props.keyz) );
    //   this.props.passDownInfo({card: this.state.card, fob: this.state.fob, packageRoom: this.state.packageRoom, frontDoor: this.state.frontDoor, user: this.props.user })

  }

  changeFront() {
      let opp4 = !this.state.frontDoor;
      this.setState({
          frontDoor: opp4
      },  () => this.props.passDownInfo({card: this.state.card, fob: this.state.fob, packageRoom: !this.state.packageRoom, frontDoor: !this.state.frontDoor, user: this.props.user },this.props.keyz) );
    //   this.props.passDownInfo({card: this.state.card, fob: this.state.fob, packageRoom: this.state.packageRoom, frontDoor: this.state.frontDoor, user: this.props.user })

  }

  changeCheckBox() {
      let opp = !this.state.card;
      this.setState({
          card: opp,
          fob: false
      }, () => this.props.passDownInfo({card: this.state.card, fob: this.state.fob, packageRoom: !this.state.packageRoom, frontDoor: !this.state.frontDoor, user: this.props.user },this.props.keyz) );
    //   this.props.passDownInfo({card: this.state.card, fob: this.state.fob, packageRoom: this.state.packageRoom, frontDoor: this.state.frontDoor, user: this.props.user })
  }
  changeSecondBox() {
    let opp2 = !this.state.fob;
    this.setState({
        card: false,
        fob: opp2
    }, () => this.props.passDownInfo({card: this.state.card, fob: this.state.fob, packageRoom: !this.state.packageRoom, frontDoor: !this.state.frontDoor, user: this.props.user },this.props.keyz) ); 
    // this.props.passDownInfo({card: this.state.card, fob: this.state.fob, packageRoom: this.state.packageRoom, frontDoor: this.state.frontDoor, user: this.props.user })

  }
  render() {
    let showUser;
    let fob;
    let card;
    let packageRoom;
    let frontDoor;

    if (this.state.showUser) {
      showUser = <Image source={require('../../img/up-arrow.png')} style={{height: 20, width: 20}}/>;
    } else {
      showUser = <Image source={require('../../img/angle-arrow-down.png')} style={{height: 20, width: 20}}/>;
    }

    if (this.state.card) {
        card = 
        <TouchableOpacity style={{padding: 5, paddingRight: 20}} onPress={this.changeCheckBox}>
            <Image source={require('../../img/check.png')} style={{width: 30, height: 30}}/>
        </TouchableOpacity>;
    } else {
        card =
        <TouchableOpacity style={{padding: 5, paddingRight: 23}} onPress={this.changeCheckBox}>
            <Image source={require('../../img/check-box-empty.png')} style={{width: 27, height: 27}}/>
        </TouchableOpacity>;
    }

    if (this.state.fob) {
        fob = 
        <TouchableOpacity style={{padding: 5, paddingRight: 20}} onPress={this.changeSecondBox}>
            <Image source={require('../../img/check.png')} style={{width: 30, height: 30}}/>
        </TouchableOpacity>;
    } else {
        fob =
        <TouchableOpacity style={{padding: 5, paddingRight: 23}} onPress={this.changeSecondBox}>
            <Image source={require('../../img/check-box-empty.png')} style={{width: 27, height: 27}}/>
        </TouchableOpacity>;
    }

    if (this.state.packageRoom) {
        packageRoom = 
        <TouchableOpacity style={{padding: 5, paddingRight: 23}} onPress={this.changePackage}>
            <Image source={require('../../img/off.png')} style={{width: 35, height: 27}}/>
        </TouchableOpacity>;
    } else {
        packageRoom =
        <TouchableOpacity style={{padding: 5, paddingRight: 23}} onPress={this.changePackage}>
            <Image source={require('../../img/on.png')} style={{width: 35, height: 27}}/>
        </TouchableOpacity>;
    }

    if (this.state.frontDoor) {
        frontDoor = 
        <TouchableOpacity style={{padding: 5, paddingRight: 23}} onPress={this.changeFront}>
            <Image source={require('../../img/off.png')} style={{width: 35, height: 27}}/>
        </TouchableOpacity>;
    } else {
        frontDoor =
        <TouchableOpacity style={{padding: 5, paddingRight: 23}} onPress={this.changeFront}>
         <Image source={require('../../img/on.png')} style={{width: 35, height: 27}}/>
        </TouchableOpacity>;
    }

      return (
        <View>
            <TouchableOpacity style={{flexDirection: 'row', height: 40,backgroundColor: '#f1f1f1', width: '100%', alignItems: 'center', borderBottomColor: 'black', borderBottomWidth: 1}} onPress={this.changeArrow}>
                <View style={{paddingHorizontal: 10}} onPress={this.changeArrow}>
                    {showUser}
                </View>
                <Text style={{color: 'black', fontSize: 16}}>{this.props.user}</Text>
            </TouchableOpacity>
            {this.state.showUser ?   
             <View>
                <View style={{flexDirection: 'row', height: 40, alignItems: 'center'}}>
                    <Text style={{fontSize: 16, color: 'black'}}>Card</Text>
                    <View style={{flex: 1}}></View>
                    {card}
                </View>
                <View style={{flexDirection: 'row', height: 40, alignItems: 'center'}}>
                    <Text style={{fontSize: 16, color: 'black'}}>FOB</Text>
                    <View style={{flex: 1}}></View>
                    {fob}
                </View>
                <View style={{flexDirection: 'row', height: 40, alignItems: 'center'}}>
                    <Text style={{fontSize: 16, color: 'black'}}>Allow Package Room Access</Text>
                    <View style={{flex: 1}}></View>
                    {packageRoom}
                </View>
                <View style={{flexDirection: 'row', height: 40, alignItems: 'center'}}>
                    <Text style={{fontSize: 16, color: 'black'}}>Allow Front Door Access</Text>
                    <View style={{flex: 1}}></View>
                    {frontDoor}
                </View>
            </View>
            :
            <View></View>
        }
        </View>
      )
  }
}
