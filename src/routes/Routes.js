import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import GetStarted from "../screens/GetStarted";
import Home from "../screens/Home";
import Scan from "../screens/Scan";
import AddDocument from "../screens/AddDocument";
import DocumentDetails from "../screens/DocumentDetails";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

// Cria a stack e navegação entre as telas

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DocumentDetails"
        component={DocumentDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddDocument"
        component={AddDocument}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function ScanStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Scan"
        component={Scan}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddDocument"
        component={AddDocument}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Scan" component={ScanStack} />
    </Tab.Navigator>
  );
}

export default function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(!!token);
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  if (loading) {
    return null; // Show a loading indicator here if needed
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "Main" : "GetStarted"}
      >
        {!isAuthenticated ? (
          <>
            <Stack.Screen
              name="GetStarted"
              component={GetStarted}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}