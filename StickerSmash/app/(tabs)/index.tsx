import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Image, ImageSource } from 'expo-image';
import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useRef, useState } from 'react';
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiList from '@/components/EmojiList';
import EmojiSticker from '@/components/EmojiSticker';
import * as MediaLibrary from 'expo-media-library';

import { captureRef } from 'react-native-view-shot';

const PlaceHolderImage = require('../../assets/images/background-image.png');

export default function Index() {
  const imageRef = useRef(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
      console.log(result);
    }
    else{
      alert('No image selected');
    }
  }

  useEffect (() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, []);

  const onReset = () => {
    setShowAppOptions(false);
  }

  const onModelClose = () => {
    setIsModalVisible(false);
  }

  const onAddSticker = () => {
    console.log('Add sticker');
    setIsModalVisible(true);
  }

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert('Saved!');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View ref={imageRef} style={styles.imageContainer}>
        <ImageViewer imgSource={selectedImage || PlaceHolderImage} />
        {pickedEmoji && (
        <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
        )}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
        <View style={styles.optionsRow}>
          <IconButton icon="refresh" label="Reset" onPress={onReset} />
          <CircleButton onPress={onAddSticker} />
          <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
        </View>
      </View>
      ): (
        <View style={styles.footerContainer}>
          <Button label='Choose a photo' theme='primary' onPress={pickImageAsync} />
          <Button label='Use this photo' onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModelClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModelClose} />
      </EmojiPicker>
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
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});