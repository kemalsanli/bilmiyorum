import { StatusBar } from 'expo-status-bar';
import CryptoJS from 'crypto-js'
import React, {useState, useEffect} from 'react';
import {Text, StyleSheet,View,FlatList, TouchableOpacity, Alert, Clipboard} from 'react-native';
import Constants from 'expo-constants';

console.log("ProofofConcept.");
// https://docs.expo.io/versions/v39.0.0/sdk/brightness/
const device = [Constants.appOwnership,Constants.debugMode, Constants.deviceName , Constants.deviceYearClass , Constants.experienceUrl, Constants.expoRuntimeVersion, Constants.expoVersion, Constants.installationId, Constants.intentUri, Constants.isDetached, Constants.isDevice, Constants.isHeadless, Constants.linkingUri,
    Constants.linkingUrl, Constants.name, Constants.nativeAppVersion, Constants.nativeBuildVersion, Constants.sessionId, Constants.statusBarHeight, Constants.systemVersion, Clipboard.getString]
    
 const hamDegerler = [Constants.appOwnership,Constants.debugMode, Constants.deviceName , Constants.deviceYearClass , Constants.experienceUrl, Constants.expoRuntimeVersion, Constants.expoVersion, 
        Constants.getWebViewUserAgentAsync, Constants.installationId, Constants.intentUri, Constants.isDetached, Constants.isDevice, Constants.isHeadless, Constants.linkingUri,
        Constants.linkingUrl, Constants.manifest, Constants.name, Constants.nativeAppVersion, Constants.nativeBuildVersion, Constants.platform, Constants.sessionId, Constants.statusBarHeight, 
        Constants.systemFonts, Constants.systemVersion]









const randomHash=() => {
    var sayac = 0
    const [kelime, setKelime] = useState("");
    const rhashFunc = () => {
    
         while ( sayac < Math.floor(Math.random() * 9999) + 500) {
                 var deger =  CryptoJS.SHA3(deger + device[Math.floor(Math.random() * device.length-1)]).toString(CryptoJS.enc.Hex)
                 sayac++
                 setKelime(deger);
                 
                
                 
        }; 
        
        
    };
    
    const DATA = [
        {
          hash: CryptoJS.SHA3(kelime).toString(CryptoJS.enc.Hex),
          title: "SHA3 ",
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
        },
        
      ];
      const copyToClipboard = (Text) => {
        sayac = 0
        rhashFunc()
        Clipboard.setString(Text);
        //Alert.alert('Bilgilendirme','Hash Kopyalandı.',[{text: 'Kapat'}]);
    };
    useEffect(()=>{
        rhashFunc();
    },[])
    
        

    return <View style={{flex:1}}>
        <StatusBar style="auto"/>
               
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
    
  
};

const styles = StyleSheet.create({
    row:{
        flex: 1,
        paddingVertical:25,
        paddingHorizontal:15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth:1,
        borderBottomColor: 'black'
        
    },
    title:{
        fontSize:20,
        lineHeight:20,
        paddingVertical: 15,
        fontWeight:'bold'
    },
    hash:{
        flex:1,
        fontSize:15,
        lineHeight:20,
        paddingVertical: 15
    }
});


export default randomHash;