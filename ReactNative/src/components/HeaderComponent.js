import React from 'react'
import {StyleSheet} from 'react-native'
import {Header} from 'react-native-elements'
import {withNavigation} from '@react-navigation/compat'

class HeaderComponent extends React.Component {
  render() {
    return <Header
      centerComponent={{
        text: this.props.title,
        style: {
          color: '#fff'
        }
      }}
      statusBarProps={{
        backgroundColor: 'transparent',
      }}
      backgroundColor={'blue'}
    />
  }
}

const styles = StyleSheet.create({
})

export default withNavigation(HeaderComponent)
