import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Platform, Image, Clipboard } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ImagePicker from 'react-native-image-picker'
import LinearGradient from 'react-native-linear-gradient'
import { sha3_512 } from 'js-sha3';
import { responsiveScreenHeight, responsiveScreenWidth, responsiveScreenFontSize } from 'react-native-responsive-dimensions'
import HeaderComponent from '../components/HeaderComponent'

const mainPage=({navigation}) => {

  const [image, setImage] = useState(null);
  const[copyState,setCopyState] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('izninizle çalışabilir miyim ?');
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
    {image &&
      <LinearGradient
        start={[0, 0.5]}
        end={[1, 0.5]}
        colors={['#EFBB35', '#4AAE9B']}
        style={{borderRadius: 5}}
      >
        <View style={{margin: responsiveScreenWidth(2.5), borderRadius: 1}}>
          <TouchableOpacity
            onPress={() => {
                Clipboard.setString(sha3_512(image));
                setCopyState("1");
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
      <LinearGradient start={[0, 0.5]}
        end={[1, 0.5]}
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
};

mainPage.navigationOptions = ({navigation}) => {
  return {
    headerRight: () =>
      <TouchableOpacity onPress={()=> navigation.navigate('RandomHash')}>
        <FontAwesome5
          name="random"
          size={30}
          color="black"
          style={{marginRight: responsiveScreenWidth(2.7)}}
        />
      </TouchableOpacity>,
    headerLeft: () =>
      <TouchableOpacity onPress={()=> navigation.navigate('TextToHash')}>
        <MaterialCommunityIcons
          name="format-text"
          size={30}
          color="black"
          style={{marginLeft: responsiveScreenWidth(2.7)}}
        />
      </TouchableOpacity>
  };
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
