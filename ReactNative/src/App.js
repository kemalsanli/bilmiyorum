import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element'

import mainPage from './screens/mainPage'
import randomHash from './screens/randomHash'
import results from './screens/results'
import textToHash from './screens/textToHash'

const Stack = createSharedElementStackNavigator();

class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRuteName= "mainPage">
          <Stack.Screen
            name="mainPage"
            component={mainPage}
            options={{
              header: () => null,
            }}
          />
          <Stack.Screen
            name="randomHash"
            component={randomHash}
            options={navigation => ({
              header: () => null,
              headerBackTitleVisible: false,
            })}
          />
          <Stack.Screen
            name="results"
            component={results}
            options={{
              header: () => null,
            }}
          />
          <Stack.Screen
            name="textToHash"
            component={textToHash}
            options={{
              header: () => null,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App;
