import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking } from "react-native";
import { Video } from "expo-av";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import * as StoreReview from 'expo-store-review';
import { WaveIndicator } from 'react-native-indicators'; // Import the WaveIndicator

function VideoScreen({ route }) {
  const { videoUrl, source } = route.params; // Added source parameter
  const [saving, setSaving] = useState(false);

  const saveToDevice = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access storage is required to save the video.');
      return;
    }

    if (!videoUrl) {
      alert('No video to save.');
      return;
    }

    setSaving(true);

    try {
      const fileUri = FileSystem.cacheDirectory + 'video.mp4'; // You can change the file name here if needed
      await FileSystem.downloadAsync(videoUrl, fileUri);
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync('Download', asset, false);
      Alert.alert('Video saved', 'The video has been saved to your device.');
    } catch (error) {
      console.error('Error saving video:', error);
      alert('An error occurred while saving the video.');
    }

    setSaving(false);
  };

  const requestAppReview = async () => {
    try {
      await StoreReview.requestReview();
    } catch (error) {
      console.error('Error requesting review:', error);
      alert('An error occurred while requesting a review.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textexpdown}>Your video is downloaded and ready to save.</Text>

      <Video
        source={{ uri: videoUrl }}
        style={styles.video}
        useNativeControls
        shouldPlay={true}
      />
      {saving && <View style={styles.loadingOverlay}><WaveIndicator color="#EA6FB2" />
      <Text style={{ position: 'absolute',
    paddingTop: 70,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center'}}>Saving to Device...</Text></View>}

      <TouchableOpacity onPress={saveToDevice} style={styles.button}>
        <Text style={styles.text}>Save to Device</Text>
      </TouchableOpacity>
      <View style={{bottom: 50, position: 'absolute', width: '100%'}}>
      <Text style={styles.textexpl}>Created by Selenium Co. LLC © 2024</Text>
      <Text style={styles.textexp}>Do you like the app? Please give us feedback.</Text>
      <TouchableOpacity onPress={requestAppReview} style={styles.buttontwo}>
        <Text style={styles.text}>Review Our App</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FADAA0',
    padding: 20,
    paddingTop: 100
  },
  video: {
    width: "95%",
    aspectRatio: 16 / 9,
    marginVertical: 20,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 0.5,
  },
  button: {
    backgroundColor: "#68D2A4",
    borderWidth: 2,
    justifyContent: 'center',
    borderRadius: 17,
    marginBottom: 10,
    width: '100%',
    height: 50,
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOpacity: 1,
    elevation: 1,
    shadowRadius: 0.1,
    shadowOffset: { width: 4, height: 5 },
  },
  buttontwo: {
    backgroundColor: "#EA6FB2",
    borderWidth: 2,
    justifyContent: 'center',
    borderRadius: 17,
    marginBottom: 10,
    width: '100%',
    height: 50,
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOpacity: 1,
    elevation: 1,
    shadowRadius: 0.1,
    shadowOffset: { width: 4, height: 5 },
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textexp: {
    textAlign: 'center',
    marginBottom: 10
  },
  textexpl: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  textexpdown: {
    textAlign: 'center',
    marginVertical: 10,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    zIndex: 999,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

export default VideoScreen;
