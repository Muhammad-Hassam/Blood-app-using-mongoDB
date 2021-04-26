import 'react-native-gesture-handler';
import React from "react";
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Home from "../screens/home";
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Tabs from '../screens/tabs';
import Profiles from '../screens/profile'
import Editform from '../screens/editform';
import Donorsform from '../screens/donorsform';
import Donation from '../screens/donation'


const Stack=createStackNavigator();

export default function Navigations(){

    return (
    <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false,}}/>
        <Stack.Screen name="Profiles" component={Profiles} options={{headerShown: false,}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false,}}/>
        <Stack.Screen name="Signup" component={Signup} options={{headerShown: false,}}/>
        <Stack.Screen name="Tabs" component={Tabs} options={{headerShown: false,}}/>
        <Stack.Screen name="Editform" component={Editform} options={{headerShown: false,}}/>
        <Stack.Screen name="Donorsform" component={Donorsform} options={{headerShown: false,}}/>
        <Stack.Screen name="Donation" component={Donation} options={{headerShown: false,}}/>
        </Stack.Navigator>
    </NavigationContainer>
    );
}