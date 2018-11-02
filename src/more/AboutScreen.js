import React, {Component} from 'react';
import {StyleSheet, Platform, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';

export default class AboutScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image source={require('../../img/left-arrow.png')} style={{width: 25, height: 25}}/>
            </TouchableOpacity>
            <View style={styles.paddingL}>
              <Text style={styles.headerText}>About</Text>
            </View>
          </View>

          <ScrollView>
            <View style={{padding: 20}}>
              <View style={{paddingBottom: 15}}>
                <Text style={{fontSize: 22, fontWeight: 'bold'}}>Virtual Service Company</Text>
              </View>
              <View>
                <Text>Virtual Service, headquartered in New York, NY, is a division of Future Communications Corporation, a leading provider of videoconferencing systems, peripherals, installations and custom integration. Virtual Service is the leader in interactive video monitoring systems and alarm services and the development and design of advanced video security systems. As a preferred provider of advanced visual communication, video documentation and archiving technology solutions, we offer a vast array of audio, video, CCTV security, card access, and video documentation equipment from all of the leading manufacturers. We provide access to the most comprehensive range of products to meet your specific requirements.</Text>
              </View>
            </View>

            <View style={{padding: 20}}>
              <View style={{paddingBottom: 15}}>
                <Text style={{fontSize: 22, fontWeight: 'bold'}}>What makes us Different?</Text>
              </View>
              <View>
                <Text>Each of our digital video solutions help you meet the increased challenges of today’s security and surveillance, enabling you to improve safety by reducing and preventing security breaches and accidents. Our Central Command Center networks with your security system to offer remote monitoring with the capability of live, two-way, interactive response for a preventative security solution. We also offer state-of-the-art products, technological expertise, a comprehensive network of strategic business alliances combined with outstanding service and support that has made us unique in the security industry. Our systems and services are widely used in Residential Properties, Retail Stores, Office Buildings, Distribution Centers,Industrial complexes, Hospitals, and Schools.</Text>
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
    paddingLeft: 20,
    backgroundColor: '#BA2745',
    flexDirection: 'row'
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  paddingL: {
    paddingLeft : 20
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#BA2745'
  }
});