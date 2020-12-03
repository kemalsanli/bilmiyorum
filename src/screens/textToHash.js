
import { StatusBar } from 'expo-status-bar';
import CryptoJS from 'crypto-js'
import React, {useState} from 'react';
import {Text, StyleSheet,View,FlatList, TouchableOpacity, Alert, Clipboard} from 'react-native';
import { SearchBar } from 'react-native-elements';






console.log("demedi deme");







const textToHash=() => {
    const [kelime, setKelime] = useState("");
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
        Clipboard.setString(Text);
        //Alert.alert('Bilgilendirme','Hash Kopyalandı.',[{text: 'Kapat'}]);
    };

    return <View style={{flex:1}}>
        <StatusBar style="auto"/>
        <SearchBar
        placeholder="Kelime giriniz."
        value={kelime}
        lightTheme
        onChangeText={newSearch => setKelime(newSearch)}
        autoCapitalize = 'none'
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


export default textToHash;