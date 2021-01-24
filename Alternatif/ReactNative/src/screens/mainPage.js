import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Platform, Image, Clipboard} from 'react-native';
import {responsiveScreenHeight, responsiveScreenWidth, responsiveScreenFontSize} from 'react-native-responsive-dimensions';
import HeaderComponent from '../components/HeaderComponent'

import { sha3_512 } from 'js-sha3';
import {LinearGradient} from 'react-native-linear-gradient';
import * as ImagePicker from 'react-native-image-picker';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const mainPage=({navigation}) => {

  const [image, setImage] = useState(null);
  const[copyState,setCopyState] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('izninizle çalışabilir miyim ?');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const xorApiD = async () => {
    const sayi=new FormData();
    let filename = image.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    sayi.append('image', { uri: image, name: filename, type });
    sayi.append('hash',"4f54e67cb598e8219158647e6340af13ab3b07b48f2501226d2f516f0be11058");


    await fetch('http://127.0.0.1:8000/api/', {
      method: 'POST',
      body: sayi,
      headers: {
        'content-type': 'multipart/form-data',
      },
    }).then(res=>{return res.blob()})
        .then(blob=>{
          var img = URL.createObjectURL(blob);

          // Do whatever with the img
          //setImage(img);
          var reader = new FileReader();
          reader.readAsDataURL(img);
            console.log("geldi");

        })
  };

  return <>
    <HeaderComponent
      title={'Bilmiyorum'}
      leftComponent={
        <TouchableOpacity onPress={()=> navigation.navigate('textToHash')}>
          <MaterialCommunityIcons
            name="format-text"
            size={30}
            color="black"
            style={{marginLeft: responsiveScreenWidth(2.7)}}
          />
        </TouchableOpacity>
      }
      rightComponent={
        <TouchableOpacity onPress={()=> navigation.navigate('randomHash')}>
          <FontAwesome5
            name="random"
            size={30}
            color="black"
            style={{marginRight: responsiveScreenWidth(2.7)}}
          />
        </TouchableOpacity>
      }
    />
    <View style={styles.picker}>
    {image &&
      <LinearGradient
        start={{x:0, y:0.5}}
        end={{x:1, y:0.5}}
        colors={['#EFBB35', '#4AAE9B']}
        style={{borderRadius: 5}}
      >
        <View style={{margin: responsiveScreenWidth(2.5), borderRadius: 1}}>
          <TouchableOpacity
            onPress={() => {
                Clipboard.setString(sha3_512(image));
                setCopyState("1");
                xorApiD();
            }}
          >
            <View style={{alignItems: "center"}}>
              <Image
                source={{ uri: image }}
                style={styles.imageStyle}
              />
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    }
    <TouchableOpacity
      onPress={()=>{
        pickImage();
        setCopyState(null);
      }}
      style={styles.buttonStyle}
    >
      <LinearGradient start={{x:0, y:0.5}}
        end={{x:1, y:0.5}}
        colors={['#EFBB35', '#4AAE9B']}
        style={{borderRadius: 5}}
      >
        <View style={styles.circleGradient}>
          {image ? <Text style={styles.visit}>Başka Görsel Seç</Text>:<Text style={styles.visit}>Görsel Seç</Text>}
        </View>
      </LinearGradient>
    </TouchableOpacity>
    {copyState && <Text>Görselin SHA3 512 Hash'i başarıyla kopyalandı.</Text>}
  </View>
  </>
};

const styles = StyleSheet.create({
  picker:{
    flex:1,
    alignItems: "center",
    justifyContent:"center",
  },
  circleGradient: {
    borderRadius: 5,
    backgroundColor: "white",
    margin: responsiveScreenWidth(0.3),
  },
  visit: {
    color: '#008f68',
    textAlign: "center",
    backgroundColor: "white",
    margin: responsiveScreenWidth(1.5),
    fontSize: responsiveScreenFontSize(2.5),
    paddingHorizontal: responsiveScreenWidth(3.5),
  },
  imageStyle: {
    width: responsiveScreenWidth(55),
    height: responsiveScreenWidth(55),
    margin: responsiveScreenWidth(1.5),
    paddingHorizontal: responsiveScreenWidth(2),
  },
  buttonStyle: {
    elevation:8,
    marginTop: responsiveScreenWidth(2),
    paddingVertical: responsiveScreenWidth(2),
    paddingHorizontal: responsiveScreenWidth(2.5),
  }
});

export default mainPage;
