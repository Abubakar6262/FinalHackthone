import React, { useContext } from 'react'
import { CommonActions, NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { createNativeStackNavigator } from '@react-navigation/native-stack';



// import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'

//Screens
import SignUp from '../screens/auth/SignUp';
import SignIn from '../screens/auth/SignIn';
import ForgotPassword from '../screens/auth/ForgotPassword';
import HomeScreen from '../screens/frontend/Home'
import DashBoardScreen from '../screens/frontend/DashBoard'
import ContactScreen from '../screens/frontend/Contact'

import { useAuthContext } from '../contexts/AuthContext';
import OrderScreen from '../screens/frontend/components/Order';

// const Tab = createMaterialBottomTabNavigator();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AppNavigator() {

  let { curUserToken } = useAuthContext()
  // curUserToken = true
  console.log('My curUser Token =>', curUserToken);

  return (
    <>
      <SafeAreaProvider>

        <NavigationContainer>

          {!curUserToken
            ? <Stack.Navigator screenOptions={{ headerShown: false }}>
              {/* Authentication Screen Group */}
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="Register" component={SignUp} />
              <Stack.Screen name="ForgotPass" component={ForgotPassword} />
            </Stack.Navigator>
           
           //Frontend Screens
            : <Tab.Navigator
              screenOptions={{
                headerShown: false,
              }}
              tabBar={({ navigation, state, descriptors, insets }) => (
                <BottomNavigation.Bar
                  navigationState={state}
                  safeAreaInsets={insets}
                  onTabPress={({ route, preventDefault }) => {
                    const event = navigation.emit({
                      type: 'tabPress',
                      target: route.key,
                      canPreventDefault: true,
                    });

                    if (event.defaultPrevented) {
                      preventDefault();
                    } else {
                      navigation.dispatch({
                        ...CommonActions.navigate(route.name, route.params),
                        target: state.key,
                      });
                    }
                  }}
                  renderIcon={({ route, focused, color }) => {
                    const { options } = descriptors[route.key];
                    if (options.tabBarIcon) {
                      return options.tabBarIcon({ focused, color, size: 24 });
                    }

                    return null;
                  }}
                  getLabelText={({ route }) => {
                    const { options } = descriptors[route.key];
                    const label =
                      options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                          ? options.title
                          : route.title;

                    return label;
                  }}
                />
              )}
            >
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  tabBarLabel: 'Home',
                  tabBarIcon: ({ color, size }) => {
                    return <Icon name="home" size={size} color={color} />;
                  },
                }}
              />
              <Tab.Screen
                name="Dashboard"
                component={DashBoardScreen}
                options={{
                  tabBarLabel: 'Dashboard',
                  tabBarIcon: ({ color, size }) => {
                    return <Icon name="cog" size={size} color={color} />;
                  },
                }}
              />
              <Tab.Screen
                name="Orders"
                component={OrderScreen}
                options={{
                  tabBarLabel: 'Orders',
                  tabBarIcon: ({ color, size }) => {
                    return <Icon name="basket" size={size} color={color} />;
                  },
                }}
              />
              <Tab.Screen
                name="Contact"
                component={ContactScreen}
                options={{
                  tabBarLabel: 'Contact',
                  tabBarIcon: ({ color, size }) => {
                    return <Icon name="phone" size={size} color={color} />;
                  },
                }}
              />
              
            </Tab.Navigator>

          }
        </NavigationContainer >
      </SafeAreaProvider>
    </>
  )
}
