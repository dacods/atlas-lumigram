import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import storage from '@/lib/storage';
import firestore from '@/lib/firestore';
import { useAuth } from '@/components/AuthProvider';

export default function Tab() {
  const auth = useAuth();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [caption, setCaption] = useState('');

  async function save() {
    if (!imageUri) return;
    const save = imageUri?.split('/').pop() as string;
    const {downloadURL, metadata} = await storage.upload(imageUri, save)
    console.log(downloadURL);

    firestore.addPost({
      caption,
      image: downloadURL,
      createdAt: new Date(),
      CreatedBy: auth.user?.uid!!,
    });
    alert('Post Added!');
  }

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'You need to allow access to your camera roll.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!imageUri) {
      Alert.alert('Missing image', 'Please select an image.');
      return;
    }
    Alert.alert('Post saved!', `Caption: ${caption}`);
  };

  const handleReset = () => {
    setImageUri(null);
    setCaption('');
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={pickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>Tap to select image</Text>
          </View>
        )}
      </Pressable>

      <TextInput
        placeholder="Add a caption"
        value={caption}
        onChangeText={setCaption}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <Pressable onPress={save} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </Pressable>

      <Pressable onPress={handleReset}>
        <Text style={styles.resetText}>Reset</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 24,
    marginBottom: 24,
  },
  imagePlaceholder: {
    width: 300,
    height: 300,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  imagePlaceholderText: {
    color: 'white',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#1ED2AF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#1ED2AF',
    paddingVertical: 23,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '85%',
    alignItems: 'center',
    marginBottom: 40,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resetText: {
    color: 'black',
    fontSize: 20
  },
});
