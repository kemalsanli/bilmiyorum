import React from 'react'
import {StyleSheet} from 'react-native'
import {Header} from 'react-native-elements'
import {withNavigation} from '@react-navigation/compat'
import {responsiveScreenHeight, responsiveScreenWidth, responsiveScreenFontSize} from 'react-native-responsive-dimensions'

class HeaderComponent extends React.Component {
  state = {
    drawerIsOpen: false,
  }

  listenerOpen = null
  listenerClose = null

  componentDidMount() {
    this.listenerOpen = this.props.navigation.addListener('drawerOpen', this.onDrawerOpen)
    this.listenerClose = this.props.navigation.addListener('drawerClose', this.onDrawerClose)
  }

  componentWillUnmount() {
    this.listenerOpen()
    this.listenerClose()
  }

  render() {
    return <Header
      leftComponent={this.props.leftComponent}
      centerComponent={{
        text: this.props.title,
        style: {
          color: 'black',
          fontSize: responsiveScreenWidth(7),
          backgroundColor: 'white'
        }
      }}
      rightComponent={this.props.rightComponent}
      statusBarProps={{
        backgroundColor: 'transparent',
      }}
      backgroundColor= {'white'}
    />
  }

  onDrawerOpen = ( event ) => {
    this.setState({
      drawerIsOpen: true,
    })
  }

  onDrawerClose = ( event ) => {
    this.setState({
      drawerIsOpen: false,
    })
  }
}

const styles = StyleSheet.create({
})

export default withNavigation(HeaderComponent)
