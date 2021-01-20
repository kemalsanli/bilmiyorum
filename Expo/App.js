import React from 'react'
import {Text, StatusBar} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-community/async-storage'

import IntroScreen from './src/screens/IntroScreen'
import mainPage from './src/screens/mainPage';
import randomHash from './src/screens/randomHash'
import results from './src/screens/results'
import textToHash from './src/screens/textToHash'

const Stack = createStackNavigator()

class App extends React.Component {

  state = {
    navigationStateFlow: false,
    navigationState: null,
  }

  render() {
    return <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} />
      <NavigationContainer
        initialState={this.state.navigationState}
        onStateChange={this.onNavigationStateChange}
      >
        <Stack.Navigator
          initialRouteName={'IntroScreen'}
          screenOptions={{
            animationEnabled: false,
            headerShown: false,
          }}
          drawerType={'back'}
        >
          <Stack.Screen
            name={'IntroScreen'}
            component={IntroScreen}
            options={{
            }}
          />
          <Stack.Screen
            name={'mainPage'}
            component={mainPage}
            options={{
            }}
          />
          <Stack.Screen
            name={'randomHash'}
            component={randomHash}
            options={{
            }}
          />
          <Stack.Screen
            name={'results'}
            component={results}
            options={{
            }}
          />
          <Stack.Screen
            name={'textToHash'}
            component={textToHash}
            options={{
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  }


  navigationStateFlow = async () => {
    if(__DEV__) {
      await this.initNavigationState()
    }
    this.setState({
      navigationStateFlow: true,
    })
  }

  initNavigationState = async () => {
    let navigationState = await AsyncStorage.getItem('NAVIGATION_STATE')
    navigationState = JSON.parse(navigationState)
    this.setState({
      navigationState,
    })
  }

  onNavigationStateChange = ( navigationState ) => {
    AsyncStorage.setItem('NAVIGATION_STATE', JSON.stringify(navigationState))
  }
}

export default App;
