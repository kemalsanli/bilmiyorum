import React from 'react'
import {View, Text, StatusBar} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-community/async-storage'

import IntroScreen from './screens/IntroScreen'
import mainPage from './screens/mainPage'
import randomHash from './screens/randomHash'
import results from './screens/results'
import textToHash from './screens/textToHash'

const Stack = createStackNavigator()

class App extends React.Component {
  componentDidMount() {
    Promise.all([
      this.getInitialScreen(),
    ]).then(() => {
      this.setState({
        flow: true,
      })
    })
  }

  state = {
    flow: false,
    initialRouteName: null,
  }

  render() {
    return (!this.state.flow) ? <View/> : <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={this.state.initialRouteName}
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

  getInitialScreen = async () => {
    this.setState({
      initialRouteName: await AsyncStorage.getItem('Intro') == null ? 'IntroScreen' : 'mainPage'
    })
  }
}

export default App;
