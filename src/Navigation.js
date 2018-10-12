import { createStackNavigator } from 'react-navigation';
import MainScreen from './MainScreen';

const Navigation = createStackNavigator({
    Home: MainScreen
},
{
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
}
);

export default Navigation;