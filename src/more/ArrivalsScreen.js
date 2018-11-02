import React, {Component} from 'react';
import {StyleSheet, Platform, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';

export default class ArrivalsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'GUESTS',
      guests: ["Travis Brooks", "Reagan Dean", "Joe Flacco", "Tom Brady", "Jackie Williams", "Stuart Mccolm", "Yessica Charry", "Jeff Bezos", "Elon Musk", "Steve Jobs", "Mark Zuckerburg", "Tim Cook", "Pat Gelsinger", "Sundar Pichai", "Satya Nadella"],
      deliveries: ["Gator Dry Cleaning"]
    }
    this.goTo = this.goTo.bind(this);
  }

  goTo(path) {
    this.setState({
      display: path
    });
  }

  render() {
    let guests;
    let deliveries;

    if (this.state.display === 'GUESTS') {
      guests = 
        <TouchableOpacity style={styles.subHeader2} onPress={() => this.goTo("GUESTS")}>
          <Text style={styles.subHeaderText}>GUESTS</Text>
        </TouchableOpacity>;
      deliveries = 
        <TouchableOpacity style={styles.subHeader1} onPress={() => this.goTo("DELIVERIES")}>
          <Text style={styles.subHeaderText2}>DELIVERIES</Text>
        </TouchableOpacity>;
    } else {
      guests = 
        <TouchableOpacity style={styles.subHeader1} onPress={() => this.goTo("GUESTS")}>
          <Text style={styles.subHeaderText2}>GUESTS</Text>
        </TouchableOpacity>;
      deliveries = 
        <TouchableOpacity style={styles.subHeader2} onPress={() => this.goTo("DELIVERIES")}>
          <Text style={styles.subHeaderText}>DELIVERIES</Text>
        </TouchableOpacity>;
    }

    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image source={require('../../img/left-arrow.png')} style={{width: 25, height: 25}}/>
            </TouchableOpacity>
            <View style={styles.paddingL}>
              <Text style={styles.headerText}>Arrivals</Text>
            </View>
          </View>

          <View style={styles.subHeader}>
            {guests}
            {deliveries}
          </View>

          <ScrollView style={styles.body}>
          {this.state.display === "GUESTS" ? this.state.guests.map((guest, index) => (
            <TouchableOpacity style={styles.feature} key={index} onPress={() => this.props.navigation.navigate("Guest", {"guest": guest})}>
            <View style={{flex: 1}}>
              <Text style={styles.featureText}>{guest}</Text>
            </View>

            <View style={{paddingRight: 10}}>
              <Image source={require('../../img/ic_arrow_right_40_10.png')} style={{width: 35, height: 35}}/>
            </View>
          </TouchableOpacity>
            )) : 
            this.state.deliveries.map((delivery, index) => (
            <TouchableOpacity style={styles.feature} key={index} onPress={() => this.props.navigation.navigate("Delivery", {"delivery": delivery})}>
              <View style={{flex: 1}}>
                <Text style={styles.featureText}>{delivery}</Text>
              </View>
  
              <View style={{paddingRight: 10}}>
                <Image source={require('../../img/ic_arrow_right_40_10.png')} style={{width: 35, height: 35}}/>
              </View>
            </TouchableOpacity>))
            
            }
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
    paddingLeft: 20,
    backgroundColor: '#BA2745',
    flexDirection: 'row'
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  subHeader: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#ededed',
    flexDirection: 'row'
  },
  subHeaderText: {
    fontSize: 16,
    color: '#BA2745',
  },
  subHeaderText2: {
    fontSize: 16,
    color: 'black',
  },
  subHeader1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0
  },
  subHeader2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 4,
    borderColor: '#BA2745',
    margin: 0,
    padding: 0
  },
  paddingL: {
    paddingLeft: 20
  },
  body: {
    flex: 1,
    backgroundColor: 'white'
  },
  feature: {
    width: '100%',
    height: 45,
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
    fontSize: 18,
    color: 'black'
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#BA2745'
  }
});