import { createStackNavigator } from 'react-navigation';
import { Animated } from 'react-native';
import  MainScreen from './MainScreen';
const RouteConfigs =     {
    Home : MainScreen
};

const StackNavigatorConfig =     {
        initialRouteName: 'Home',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false
        },
        transitionConfig : () => ({
            transitionSpec: {
                duration: 0,
                timing: Animated.timing,
            }
        })
};

const Navigation = createStackNavigator(RouteConfigs, StackNavigatorConfig);


export default Navigation;