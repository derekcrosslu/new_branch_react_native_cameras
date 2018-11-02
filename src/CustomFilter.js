import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

export default class CustomFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Missed: false,
        Incoming: false,
        Outgoing: false,
        RecievedM: false,
        RecievedO: false
    }
    this.missedCheck = this.missedCheck.bind(this);
    this.incomingCheck = this.incomingCheck.bind(this);
    this.outgoingCheck = this.outgoingCheck.bind(this);
    this.RecievedMCheck = this.RecievedMCheck.bind(this);
    this.RecievedOCheck = this.RecievedOCheck.bind(this);
  }

  missedCheck() {
      let opp = !this.state.Missed;
      this.setState({
          Missed: opp
      });
  }
  incomingCheck() {
    let opp = !this.state.Incoming;
    this.setState({
        Incoming: opp
    });
  }

  outgoingCheck() {
    let opp = !this.state.Outgoing;
    this.setState({
        Outgoing: opp
    });
  }

  RecievedMCheck() {
    let opp = !this.state.RecievedM;
    this.setState({
        RecievedM: opp
    });
  }

  RecievedOCheck() {
    let opp = !this.state.RecievedO;
    this.setState({
        RecievedO: opp
    });
  }

  render() {
//check-box-empty
    let missed;
    let incoming;
    let outgoing;
    let RecievedM;
    let RecievedO;

    if (this.state.Missed) {
        missed = 
        <View style={{padding: 5, paddingRight: 20}}>
            <Image source={require('../img/check.png')} style={{width: 30, height: 30}}/>
        </View>;
    } else {
        missed =
        <View style={{padding: 5, paddingRight: 23}}>
            <Image source={require('../img/check-box-empty.png')} style={{width: 27, height: 27}}/>
        </View>;
    }

    if (this.state.Incoming) {
        incoming = 
        <View style={{padding: 5, paddingRight: 20}}>
            <Image source={require('../img/check.png')} style={{width: 30, height: 30}}/>
        </View>;
    } else {
        incoming =
        <View style={{padding: 5, paddingRight: 23}}>
            <Image source={require('../img/check-box-empty.png')} style={{width: 27, height: 27}}/>
        </View>;
    }

    if (this.state.Outgoing) {
        outgoing = 
        <View style={{padding: 5, paddingRight: 20}}>
            <Image source={require('../img/check.png')} style={{width: 30, height: 30}}/>
        </View>;
    } else {
        outgoing =
        <View style={{padding: 5, paddingRight: 23}}>
            <Image source={require('../img/check-box-empty.png')} style={{width: 27, height: 27}}/>
        </View>;
    }

    if (this.state.RecievedM) {
        RecievedM = 
        <View style={{padding: 5, paddingRight: 20}}>
            <Image source={require('../img/check.png')} style={{width: 30, height: 30}}/>
        </View>;
    } else {
        RecievedM =
        <View style={{padding: 5, paddingRight: 23}}>
            <Image source={require('../img/check-box-empty.png')} style={{width: 27, height: 27}}/>
        </View>;
    }

    if (this.state.RecievedO) {
        RecievedO = 
        <View style={{padding: 5, paddingRight: 20}}>
            <Image source={require('../img/check.png')} style={{width: 30, height: 30}}/>
        </View>;
    } else {
        RecievedO =
        <View style={{padding: 5, paddingRight: 23}}>
            <Image source={require('../img/check-box-empty.png')} style={{width: 27, height: 27}}/>
        </View>;
    }

    return (

        <View style={styles.filter}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Select Filters</Text>
            </View>

  
                <TouchableOpacity style={{flexDirection: 'row', width: '100%', height: 40}} onPress={this.missedCheck}>
                    <View style={{flex: 1, padding: 5, paddingLeft: 20}}>
                        <Text style={{fontSize:16, color: 'black'}}>Missed</Text>
                    </View>
                    {missed}
                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection: 'row', width: '100%', height: 40}} onPress={this.incomingCheck}>
                    <View style={{flex: 1, padding: 5, paddingLeft: 20}}>
                        <Text style={{fontSize:16, color: 'black'}}>Incoming</Text>
                    </View>
                    {incoming}
                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection: 'row', width: '100%', height: 40}} onPress={this.outgoingCheck}>
                    <View style={{flex: 1, padding: 5, paddingLeft: 20}}>
                        <Text style={{fontSize:16, color: 'black'}}>Outgoing</Text>
                    </View>
                    {outgoing}
                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection: 'row', width: '100%', height: 40}} onPress={this.RecievedMCheck}>
                    <View style={{flex: 1, padding: 5, paddingLeft: 20}}>
                        <Text style={{fontSize:16, color: 'black'}}>Recieved by Me</Text>
                    </View>
                    {RecievedM}
                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection: 'row', width: '100%', height: 40}} onPress={this.RecievedOCheck}> 
                    <View style={{flex: 1, padding: 5, paddingLeft: 20}}>
                        <Text style={{fontSize:16, color: 'black'}}>Recieved by Operator</Text>
                    </View>
                    {RecievedO}
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
        height: 310,
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
  