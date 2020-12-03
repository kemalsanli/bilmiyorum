import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet,View, TouchableOpacity, Platform, Image} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const mainPage=({navigation}) => {
    const [image, setImage] = useState(null);
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);
      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };
    
    return <View style={styles.picker}>

   
        
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius:10, borderWidth:4, borderColor:"black" }} />}
        <TouchableOpacity onPress={pickImage} style={styles.buttonContainer} >
            <Text style={styles.buttonText}>Resim Seç</Text>
        </TouchableOpacity>
       
        <StatusBar style="auto"/>

    </View>

    
  
};

mainPage.navigationOptions = ({navigation}) => {
    return {
        headerRight: () => <TouchableOpacity onPress={()=> navigation.navigate('RandomHash')}><FontAwesome5 name="random" size={30} color="black" style={styles.headerButtons}/></TouchableOpacity>,
        headerLeft: ()=> <TouchableOpacity onPress={()=> navigation.navigate('TextToHash')}><MaterialCommunityIcons name="format-text" size={30} color="black" style={styles.headerButtons}/></TouchableOpacity>
    };
};



  

const styles = StyleSheet.create({
    headerButtons:{
        marginLeft:10,
        marginRight:10

    },
    picker:{ 
        flex:1,
        alignItems: "center",
        justifyContent:"center"

    },
    buttonContainer: {
        width: 200,
        alignItems: 'center'
    },
    buttonText: {
        textAlign: 'center',
        color: 'black',
        padding: 15,
        width: 200
    }
});


export default mainPage;