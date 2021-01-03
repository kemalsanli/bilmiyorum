import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Text, StyleSheet,View,FlatList, TouchableOpacity, Alert, Clipboard } from 'react-native';
import Constants from 'expo-constants';
import CryptoJS from 'crypto-js'
import { keccak224, keccak256, keccak384, keccak512, sha3_224, sha3_256, sha3_384, sha3_512, shake128, shake256 } from 'js-sha3';
import { responsiveScreenHeight, responsiveScreenWidth, responsiveScreenFontSize } from 'react-native-responsive-dimensions'

console.log("ProofofConcept.");
// https://docs.expo.io/versions/v39.0.0/sdk/brightness/

const device = [
  Constants.appOwnership,
  Constants.debugMode,
  Constants.deviceName,
  Constants.deviceYearClass,
  Constants.experienceUrl,
  Constants.expoRuntimeVersion,
  Constants.expoVersion,
  Constants.installationId,
  Constants.intentUri,
  Constants.isDetached,
  Constants.isDevice,
  Constants.isHeadless,
  Constants.linkingUri,
  Constants.linkingUrl,
  Constants.name,
  Constants.nativeAppVersion,
  Constants.nativeBuildVersion,
  Constants.sessionId,
  Constants.statusBarHeight,
  Constants.systemVersion,
  Clipboard.getString
]

const hamDegerler = [
  Constants.appOwnership,
  Constants.debugMode,
  Constants.deviceName ,
  Constants.deviceYearClass,
  Constants.experienceUrl,
  Constants.expoRuntimeVersion,
  Constants.expoVersion,
  Constants.getWebViewUserAgentAsync,
  Constants.installationId,
  Constants.intentUri,
  Constants.isDetached,
  Constants.isDevice,
  Constants.isHeadless,
  Constants.linkingUri,
  Constants.linkingUrl,
  Constants.manifest,
  Constants.name,
  Constants.nativeAppVersion,
  Constants.nativeBuildVersion,
  Constants.platform,
  Constants.sessionId,
  Constants.statusBarHeight,
  Constants.systemFonts,
  Constants.systemVersion
]

const randomHash=() => {
  var sayac = 0
  const [kelime, setKelime] = useState("04279ffb99c19c5768536d46b9f1143a1412b75d46024f88554a83c0e05613f20beab7589173d584aebfa73fb3512376689c2cbb8ecd0067677f43e0f5bfd2ce");

  const rhashFunc = () => {
    while ( sayac < Math.floor(Math.random() * 9999) + 500) {
      var deger =  CryptoJS.SHA3(deger + device[Math.floor(Math.random() * device.length-1)]).toString(CryptoJS.enc.Hex)
      sayac++
      setKelime(deger);
    };
  };

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
    sayac = 0
    rhashFunc()
    Clipboard.setString(Text);
    //Alert.alert('Bilgilendirme','Hash Kopyalandı.',[{text: 'Kapat'}]);
    };

  useEffect(() => {
    rhashFunc();
  },[])

  return <View style={{flex:1}}>
    <StatusBar style="auto"/>
    <FlatList
      style={{width: '100%'}}
      data={DATA}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <TouchableOpacity onPress={() => copyToClipboard(item.hash)}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.hash}>{item.hash}</Text>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={item => item.title}
    />
  </View>
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

export default randomHash;
