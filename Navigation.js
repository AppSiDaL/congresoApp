import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";


//views
import Login from "./view/LoginScreen";
import HomeScreen from "./view/HomeScreeen";
import DetailsScreen from "./view/DetailsScreen";
import ExploreScreen from "./view/ExploreScreen";
import CheckScreen from "./view/CheckScreen";
import CertificadoScreen from "./view/CertificadoScreen";
const HomeStackNavigator = createStackNavigator();
function MyStack() {
  return (
    <HomeStackNavigator.Navigator initialRouteName="LoginScreen">
      <HomeStackNavigator.Screen
        name="LoginScreen"
        options={{ headerShown: false }}
        component={Login}
      />
      <HomeStackNavigator.Screen
        name="HomeScreen"
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      <HomeStackNavigator.Screen
        name="DetailsScreen"
        options={{ headerShown: false }}
        component={DetailsScreen}
      />
      <HomeStackNavigator.Screen
        name="ExploreScreen"
        options={{ headerShown: false }}
        component={ExploreScreen}
      />
      <HomeStackNavigator.Screen
        name="CheckScreen"
        options={{ headerShown: false }}
        component={CheckScreen}
      />
      <HomeStackNavigator.Screen
        name="CertificadoScreen"
        options={{ headerShown: false }}
        component={CertificadoScreen}
      />
    </HomeStackNavigator.Navigator>
  );
}
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
