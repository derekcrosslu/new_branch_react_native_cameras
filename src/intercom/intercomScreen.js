import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

import LiveView from '../../source/index';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showLive: false,
            err: undefined
        };
        this.endCall = this.endCall.bind(this);
    }  

    componentWillMount() {
        this.handleJoin();
    }

    componentDidMount() {
        const oneArr = [
            {id:0, name: 'sam0'},
            {id:1, name: 'sam1'},
            {id:2, name: 'sam2'},
            {id:3, name: 'sam3'},
            {id:4, name: 'sam4'}
        ];
        const twoArr = [
            {id:0, name: 'sam0'},
            {id:5, name: 'Max5'},
            {id:6, name: 'Max6'},
            {id:7, name: 'Max7'},
            {id:2, name: 'sam2'}
        ];

        let mergeObj = {};
        [...oneArr, ...twoArr].map(v=>{
            mergeObj[v.id] = v
        });

        const mergeArr = Object.values(mergeObj);

        console.log(mergeArr);
    }

    handleJoin = () => {
        this.setState({
            showLive: true
        })
    };

    handleCancel = (err) => {
        // console.log('Handle Cancel Ran');
        this.setState({
            showLive: false,
            err
        })
    };
    handleCancelBack = (err) => {
        this.setState({
            showLive: false,
            err: undefined
        })
    };

    endCall() {
        this.props.navigation.goBack();
    }

    render() {
        const {showLive, err} = this.state;

        if (showLive) {
            return (
                <LiveView
                    onCancel={this.handleCancel}
                    goBack={this.endCall}
                />
            )
        } else {
            return (
                <View style={styles.container2}>

                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../img/back.png')} style={{width: 25, height: 25}}/>
                        </TouchableOpacity>
                        <View style={styles.paddingL}>
                        <Text style={styles.headerText}>Intercom</Text>
                        </View>
                    </View>
                    {!!err &&
                    <Text>ERROR {err}</Text>
                    }
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.handleJoin}
                        >
                            <Text style={{color:'#fff'}}>Call Again</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    button: {
        height: 44,
        paddingHorizontal:20,
        backgroundColor:'#BA2745',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop: 10
    },
    container2: {
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
