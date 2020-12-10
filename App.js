/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Login from './Screens/Login';
import Intrest from './Screens/Interest';
import Header from './Screens/Header';
import Home from './Screens/Home';
import Account_Form from './Screens/Account_Form';
import FormPDF from './Screens/FormPDF';
import Sharing from './Screens/Share';
//import Router from './Server/Router/route';

const Stack = createStackNavigator();

function App() {
  const myOptions = {
    headerTitle: () => <Header />,
    headerTintColor: 'red',
    headerTitleAlign: 'center',
    headerStyle: {height: 40},
  };
  return (
    <View style={styles.container}>
      <Stack.Navigator headerMode="screen">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Interest" component={Intrest} options={myOptions} />
        <Stack.Screen name="Home" component={Home} options={myOptions} />
        <Stack.Screen
          name="Account_Form"
          component={Account_Form}
          options={myOptions}
        />
        <Stack.Screen name="FormPDF" component={FormPDF} />
        <Stack.Screen name="Sharing" component={Sharing} />
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
//adb -s ce0917199a4740fa0b reverse tcp:3000 tcp:3000
