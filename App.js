import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import mainPage from './src/screens/mainPage';
import randomHash from './src/screens/randomHash';
import results from './src/screens/results';
import textToHash from './src/screens/textToHash';


const navigator = createStackNavigator(
  {
    Home: mainPage,
    Result: results,
    RandomHash: randomHash,
    TextToHash: textToHash
   


  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: "Bilmiyorum"
    }
  }
);

export default createAppContainer(navigator);