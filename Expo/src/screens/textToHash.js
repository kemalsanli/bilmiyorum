
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, StyleSheet,View,FlatList, TouchableOpacity, Alert, Clipboard } from 'react-native';
import { SearchBar } from 'react-native-elements';
import 'js-sha3'
import CryptoJS from 'crypto-js'
import { keccak224, keccak256, keccak384, keccak512, sha3_224, sha3_256, sha3_384, sha3_512, shake128, shake256 } from 'js-sha3';
import { responsiveScreenHeight, responsiveScreenWidth, responsiveScreenFontSize } from 'react-native-responsive-dimensions'
import { AntDesign } from '@expo/vector-icons';
import HeaderComponent from '../components/HeaderComponent'

console.log("demedi deme");


const textToHash=({navigation}) => {

  const [kelime, setKelime] = useState("");

  const DATA = [
    {
      hash: sha3_512(kelime),
      title: "SHA3 512 ",
    },
    {
      hash: sha3_384(kelime),
      title: "SHA3 384 ",
    },
    {
      hash: sha3_256(kelime),
      title: "SHA3 256 ",
    },
    {
      hash: sha3_224(kelime),
      title: "SHA3 224 ",
    },
    {
      hash: keccak512(kelime),
      title: "KECCAK512 ",
    },
    {
      hash: keccak384(kelime),
      title: "KECCAK384 ",
    },
    {
      hash: keccak256(kelime),
      title: "KECCAK256 ",
    },
    {
      hash: keccak224(kelime),
      title: "KECCAK224 ",
    },
    {
      hash: shake256(kelime,512),
      title: "SHAKE256/512 ",
    },
    {
      hash: shake128(kelime,256),
      title: "SHAKE128/256 ",
    },
    {
      hash: CryptoJS.SHA512(kelime).toString(CryptoJS.enc.Hex),
      title: "SHA512",
    },

    {
      hash: CryptoJS.SHA384(kelime).toString(CryptoJS.enc.Hex),
      title: "SHA384 ",
    },
    {
      hash: CryptoJS.SHA256(kelime).toString(CryptoJS.enc.Hex),
      title: "SHA256 ",
    },
    {
      hash: CryptoJS.SHA224(kelime).toString(CryptoJS.enc.Hex),
      title: "SHA224 ",
    },
    {
      hash: CryptoJS.SHA1(kelime).toString(CryptoJS.enc.Hex),
      title: "SHA1 ",
    },
    {
      hash: CryptoJS.MD5(kelime).toString(CryptoJS.enc.Hex),
      title: "MD5 ",
    },
    {
      hash: CryptoJS.RIPEMD160(kelime).toString(CryptoJS.enc.Hex),
      title: "RIPEMD160 ",
    }
  ];
  const copyToClipboard = (Text) => {
    Clipboard.setString(Text);
    //Alert.alert('Bilgilendirme','Hash Kopyalandı.',[{text: 'Kapat'}]);
  };

  return <>
    <HeaderComponent
      title={'Text To Hash'}
      rightComponent={
        <TouchableOpacity onPress={()=> navigation.navigate('mainPage')}>
          <AntDesign
            name="arrowright"
            size={30}
            color="black"
            style={{marginLeft: responsiveScreenWidth(2.7)}}
          />
        </TouchableOpacity>
      }
    />
    <View style={{flex:1}}>
      <StatusBar style="auto"/>
      <SearchBar
        placeholder="Karakter giriniz."
        value={kelime}
        lightTheme
        onChangeText={newSearch => setKelime(newSearch)}
        autoCapitalize = 'none'
        borderBottomColor = 'white'
        containerStyle={{ backgroundColor: 'white'  }}
        inputStyle={{ color:'black'}}
        searchIcon = {null}
      />
      <FlatList
        style={{width: '100%'}}
        data={DATA}
        renderItem={({ item }) => (
          <View style={styles.row} >
            <TouchableOpacity onPress={() => copyToClipboard(item.hash)}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.hash}>{item.hash}</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.title}
      />
  </View>
  </>
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'black',
    justifyContent: 'space-between',
    paddingVertical: responsiveScreenWidth(8),
    paddingHorizontal: responsiveScreenWidth(4),
    borderBottomWidth: responsiveScreenWidth(0.3),
  },
  title: {
    fontWeight:'bold',
    fontSize: responsiveScreenFontSize(2.7),
    lineHeight: responsiveScreenFontSize(2.5),
    paddingVertical: responsiveScreenWidth(3),
  },
  hash: {
    flex:1,
    fontSize: responsiveScreenFontSize(2),
    lineHeight: responsiveScreenFontSize(3),
    paddingVertical: responsiveScreenWidth(3)
  },
});

export default textToHash;
