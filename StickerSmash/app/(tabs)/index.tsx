import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

const PlaceHolderImage = require('../../assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined,
  );

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log(result);
    }
    else{
      alert('No image selected');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={selectedImage || PlaceHolderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button label='Choose a photo' theme='primary' onPress={pickImageAsync} />
        <Button label='Use this photo' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  button: {
    fontSize: 20,
    color: '#fff',
    textDecorationLine: 'underline',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer:{
    flex: 1 / 3,
    alignItems: 'center',
  }
});