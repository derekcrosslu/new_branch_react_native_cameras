import { createStackNavigator } from 'react-navigation';
import { Animated } from 'react-native';
import MainScreen from './MainScreen';
import ServicesScreen from './ServicesScreen';
import LogsScreen from './LogsScreen';
import MoreScreen from './MoreScreen';
import BuildingCamerasScreen from './services/BuildingCamerasScreen';
import UnlockDoorsScreen from './services/UnlockDoorsScreen';
import KeyCardScreen from './services/KeyCardScreen';
import ArrivalsScreen from './more/ArrivalsScreen';
import GuestScreen from './more/GuestScreen';
import DeliveryScreen from './more/DeliveryScreen';
import AddPersonScreen from './more/AddPersonScreen';
import AddDeliveryScreen from './more/AddDeliveryScreen';
import AboutScreen from './more/AboutScreen';
import ChangePwScreen from './more/ChangePwScreen';
import SettingsScreen from './more/SettingsScreen';
import CallSuperintendentScreen from './services/CallSuperintendentScreen';
import intercomScreen from './intercom/intercomScreen';
import EditScreen from './more/EditScreen';
import MyAccountScreen from './more/MyAccountScreen';
import EditDeliveryScreen from './more/EditDeliveryScreen';
import EditAccountScreen from './more/EditAccountScreen';

const RouteConfigs =     {
    Home : {
        screen: MainScreen
    },
    Service: {
        screen: ServicesScreen
    },
    Logs: {
        screen: LogsScreen
    },
    More: {
        screen: MoreScreen
    },
    BuildingCameras: {
        screen: BuildingCamerasScreen
    },
    UnlockDoors: {
        screen: UnlockDoorsScreen
    },
    Arrivals: {
        screen: ArrivalsScreen
    },
    Guest: {
        screen: GuestScreen
    },
    Delivery: {
        screen: DeliveryScreen
    },
    AddPerson: {
        screen: AddPersonScreen
    },
    AddDelivery: {
        screen: AddDeliveryScreen
    },
    About: {
        screen: AboutScreen
    },
    ChangePassword: {
        screen: ChangePwScreen
    },
    Settings: {
        screen: SettingsScreen
    },
    KeyCard: {
        screen: KeyCardScreen
    },
    CallSuper: {
        screen: CallSuperintendentScreen
    },
    intercom: {
        screen: intercomScreen
    },
    Edit: {
        screen: EditScreen
    },
    EditDelivery: {
        screen: EditDeliveryScreen
    },
    account: {
        screen: MyAccountScreen
    },
    EditAccount: {
        screen: EditAccountScreen
    }
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