import React from 'react'
import {StyleSheet, Text, View, Image, StatusBar} from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import { AntDesign } from '@expo/vector-icons'
import { responsiveScreenHeight, responsiveScreenWidth, responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-community/async-storage'

class IntroScreen extends React.Component {
  slides = [
    {
      key: 's1',
      title: 'Bilmiyorum',
      text: 'Uygulama girişinde sizi Anasayfa karşılayacak',
      image: require('../images/anasayfa.jpg'),
      backgroundColor: '#20d2bb',
    },
    {
      key: 's2',
      title: 'Bilmiyorum',
      text: '\'Görsel Seç\' butonuyla şifrelemek istediğiniz görseli galerinizden seçin',
      image: require('../images/gorselsec.png'),
      backgroundColor: '#febe29',
    },
    {
      key: 's3',
      title: 'Bilmiyorum',
      text: 'Görsel seçiminden sonra görselin üstüne tıklayarak şifrelenmiş görüntünüzü alabilirsiniz',
      image: require('../images/sifreli.png'),
      backgroundColor: '#22bcb5',
    },
    {
      key: 's4',
      title: 'Bilmiyorum',
      text: '\'Başka Görsel Seç\' butonuyla şifrelenmiş görüntüyü seçebilir, orjinal görüntünüzü yeniden elde edebilirsiniz',
      image: require('../images/baskagorselsec.png'),
      backgroundColor: '#febe29',
    },
    {
      key: 's5',
      title: 'Bilmiyorum',
      text: 'Anasayfada sol üst kısımda bulunan \'Text\' butonuna tıklayarak girdiğiniz karakterlerin Hash kodlarını çıkarabilirsiniz',
      image: require('../images/texttohash.png'),
      backgroundColor: '#22bcb5',
    },
    {
      key: 's6',
      title: 'Bilmiyorum',
      text: 'Sol Üst kısımda bulunan \'Random\' butonuna tıklayarak rastgele Hash kodları elde edebilirsiniz',
      image: require('../images/randomhash.jpg'),
      backgroundColor: '#febe29',
    },
  ]

  componentDidMount() {
    this.props.navigation.addListener('focus', this._onFocusListener)
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', this._onFocusListener)
  }

  render() {
    return <AppIntroSlider
      data={this.slides}
      renderItem={this._renderItem}
      onDone={this._onDone}
      renderNextButton={this._renderNextButton}
      renderDoneButton={this._renderDoneButton}
      showSkipButton={true}
      renderSkipButton={()=> null}
    />
  }

  _renderNextButton = () => {
    return <View style={styles.buttonCircle}>
      <AntDesign
        name={'arrowright'}
        size={30}
        color={'#FFFFFF'}
      />
    </View>
  }
  _renderDoneButton = () => {
    return <View style={styles.buttonCircle}>
      <AntDesign
        name={'check'}
        size={30}
        color={'#FFFFFF'}
      />
    </View>
  }

  _renderItem = ({ item }) => {
    return <View style={[styles.itemContainer, {
        backgroundColor: item.backgroundColor
    }]}>
      <Text style={styles.title}>{item.title}</Text>
      <Image style={styles.image} source={item.image} resizeMode='stretch' />
      <Text style={styles.text}>{item.text}</Text>
    </View>
  }

  _onDone = () => {
    this.props.navigation.navigate('mainPage')
    StatusBar.setHidden(false)
    AsyncStorage.setItem('Intro', "true")
}

  _onFocusListener = () => {
    StatusBar.setHidden(true)
  }
}

const styles = StyleSheet.create({
  image: {
    width: responsiveScreenWidth(70),
    height: responsiveScreenWidth(70),
    borderRadius: 10,
  },
  text: {
    fontSize: responsiveScreenFontSize(3.3),
    fontStyle: 'italic',
    fontWeight: "bold",
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
    paddingHorizontal: responsiveScreenWidth(5)
  },
  title: {
    fontSize: responsiveScreenFontSize(4.5),
    fontWeight: "bold",
    color: 'white',
    textAlign: 'center',
    paddingVertical: responsiveScreenWidth(8),
    marginTop: responsiveScreenWidth(5)
  },
  buttonCircle:{
    width: responsiveScreenWidth(11),
    height: responsiveScreenWidth(11),
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: responsiveScreenWidth(20)
  },
});

export default IntroScreen
