import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/HomeScreen';
import LocationScreen from './components/LocationsScreen';
import AccountScreen from './components/AccountScreen';
import RestaurantScreen from './components/RestaurantScreen';
import MakeRegisterScreen from './components/MakeRegister';
import LogInScreen from './components/LogInScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="welcome" component={RegisterScreen} options={{headerShown: false}}/>
        <Stack.Screen name="sign up" component={MakeRegisterScreen} options={{headerShown: false}}/>
        <Stack.Screen name="log in" component={LogInScreen} options={{headerShown: false}}/>
        <Stack.Screen name="home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="locations" component={LocationScreen} options={{headerShown: false}}/>
        <Stack.Screen name="account" component={AccountScreen} options={{headerShown: false}}/>
        <Stack.Screen name="restaurant" component={RestaurantScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;