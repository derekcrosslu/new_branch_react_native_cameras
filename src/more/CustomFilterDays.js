import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

export default class CustomFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    }
    this.mondayCheck = this.mondayCheck.bind(this);
    this.tuesdayCheck = this.tuesdayCheck.bind(this);
    this.wednesdayCheck = this.wednesdayCheck.bind(this);
    this.thursdayCheck = this.thursdayCheck.bind(this);
    this.fridayCheck = this.fridayCheck.bind(this);
    this.saturdayCheck = this.saturdayCheck.bind(this);
    this.sundayCheck = this.sundayCheck.bind(this);
  }

  mondayCheck() {
      let opp = !this.state.monday;
      this.setState({
          monday: opp
      });
  }
  tuesdayCheck() {
    let opp = !this.state.tuesday;
    this.setState({
        tuesday: opp
    });
  }

  wednesdayCheck() {
    let opp = !this.state.wednesday;
    this.setState({
        wednesday: opp
    });
  }

  thursdayCheck() {
    let opp = !this.state.thursday;
    this.setState({
        thursday: opp
    });
  }

  fridayCheck() {
    let opp = !this.state.friday;
    this.setState({
        friday: opp
    });
  }

  saturdayCheck() {
    let opp = !this.state.saturday;
    this.setState({
        saturday: opp
    });
  }

  sundayCheck() {
    let opp = !this.state.sunday;
    this.setState({
        sunday: opp
    });
  }

  render() {
//check-box-empty
    let monday;
    let tuesday;
    let wednesday;
    let thursday;
    let friday;
    let saturday;
    let sunday;

    if (this.state.monday) {
        monday = 
        <View style={{padding: 5, paddingRight: 20}}>
            <Image source={require('../../img/check.png')} style={{width: 30, height: 30}}/>
        </View>;
    } else {
        monday =
        <View style={{padding: 5, paddingRight: 23}}>
            <Image source={require('../../img/check-box-empty.png')} style={{width: 27, height: 27}}/>
        </View>;
    }

    if (this.state.tuesday) {
        tuesday = 
        <View style={{padding: 5, paddingRight: 20}}>
            <Image source={require('../../img/check.png')} style={{width: 30, height: 30}}/>
        </View>;
    } else {
        tuesday =
        <View style={{padding: 5, paddingRight: 23}}>
            <Image source={require('../../img/check-box-empty.png')} style={{width: 27, height: 27}}/>
        </View>;
    }

    if (this.state.wednesday) {
        wednesday = 
        <View style={{padding: 5, paddingRight: 20}}>
            <Image source={require('../../img/check.png')} style={{width: 30, height: 30}}/>
        </View>;
    } else {
        wednesday =
        <View style={{padding: 5, paddingRight: 23}}>
            <Image source={require('../../img/check-box-empty.png')} style={{width: 27, height: 27}}/>
        </View>;
    }

    if (this.state.thursday) {
        thursday = 
        <View style={{padding: 5, paddingRight: 20}}>
            <Image source={require('../../img/check.png')} style={{width: 30, height: 30}}/>
        </View>;
    } else {
        thursday =
        <View style={{padding: 5, paddingRight: 23}}>
            <Image source={require('../../img/check-box-empty.png')} style={{width: 27, height: 27}}/>
        </View>;
    }

    if (this.state.friday) {
        friday = 
        <View style={{padding: 5, paddingRight: 20}}>
            <Image source={require('../../img/check.png')} style={{width: 30, height: 30}}/>
        </View>;
    } else {
        friday =
        <View style={{padding: 5, paddingRight: 23}}>
            <Image source={require('../../img/check-box-empty.png')} style={{width: 27, height: 27}}/>
        </View>;
    }

    if (this.state.saturday) {
        saturday = 
        <View style={{padding: 5, paddingRight: 20}}>
            <Image source={require('../../img/check.png')} style={{width: 30, height: 30}}/>
        </View>;
    } else {
        saturday =
        <View style={{padding: 5, paddingRight: 23}}>
            <Image source={require('../../img/check-box-empty.png')} style={{width: 27, height: 27}}/>
        </View>;
    }

    if (this.state.sunday) {
        sunday = 
        <View style={{padding: 5, paddingRight: 20}}>
            <Image source={require('../../img/check.png')} style={{width: 30, height: 30}}/>
        </View>;
    } else {
        sunday =
        <View style={{padding: 5, paddingRight: 23}}>
            <Image source={require('../../img/check-box-empty.png')} style={{width: 27, height: 27}}/>
        </View>;
    }

    return (

        <View style={styles.filter}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Select Days</Text>
            </View>

                <TouchableOpacity style={{flexDirection: 'row', width: '100%', height: 40}} onPress={this.mondayCheck}>
                    <View style={{flex: 1, padding: 5, paddingLeft: 20}}>
                        <Text style={{fontSize:16, color: 'black'}}>Monday</Text>
                    </View>
                    {monday}
                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection: 'row', width: '100%', height: 40}} onPress={this.tuesdayCheck}>
                    <View style={{flex: 1, padding: 5, paddingLeft: 20}}>
                        <Text style={{fontSize:16, color: 'black'}}>Tuesday</Text>
                    </View>
                    {tuesday}
                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection: 'row', width: '100%', height: 40}} onPress={this.wednesdayCheck}>
                    <View style={{flex: 1, padding: 5, paddingLeft: 20}}>
                        <Text style={{fontSize:16, color: 'black'}}>Wednesday</Text>
                    </View>
                    {wednesday}
                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection: 'row', width: '100%', height: 40}} onPress={this.thursdayCheck}>
                    <View style={{flex: 1, padding: 5, paddingLeft: 20}}>
                        <Text style={{fontSize:16, color: 'black'}}>Thursday</Text>
                    </View>
                    {thursday}
                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection: 'row', width: '100%', height: 40}} onPress={this.fridayCheck}> 
                    <View style={{flex: 1, padding: 5, paddingLeft: 20}}>
                        <Text style={{fontSize:16, color: 'black'}}>Friday</Text>
                    </View>
                    {friday}
                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection: 'row', width: '100%', height: 40}} onPress={this.saturdayCheck}> 
                    <View style={{flex: 1, padding: 5, paddingLeft: 20}}>
                        <Text style={{fontSize:16, color: 'black'}}>Saturday</Text>
                    </View>
                    {saturday}
                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection: 'row', width: '100%', height: 40}} onPress={this.sundayCheck}> 
                    <View style={{flex: 1, padding: 5, paddingLeft: 20}}>
                        <Text style={{fontSize:16, color: 'black'}}>Sunday</Text>
                    </View>
                    {sunday}
                </TouchableOpacity>
      
            <View style={{ flexDirection: 'row', marginTop: 20, borderTopWidth: .6, borderColor: 'black'}}>
                <TouchableOpacity style={{padding: 15, marginRight: '15%',  marginLeft: '5%'}} onPress={this.props.goBack}>
                    <Text style={{color: '#BA2745', fontSize: 16, fontWeight: 'bold'}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 15, marginLeft: '20%'}} onPress={this.props.goBack}>
                    <Text style={{color: 'green', fontSize: 16, fontWeight: 'bold'}}>Apply</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
  }
}


const styles = StyleSheet.create({
    filter: {
        position: 'absolute',
        width: '70%',
        height: 390,
        backgroundColor: 'white',
        zIndex: 1009,
        marginLeft: '15%',
        marginTop: '35%',
        borderRadius: 7
    },
    header: {
        width: '100%',
        padding: 15
    },
    headerText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    }
  });
  