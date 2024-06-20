import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { WaveIndicator } from 'react-native-indicators';


function Instagram() {
  const [inputUrlRef, setInputUrlRef] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    setIsLoading(true);

    if (!inputUrlRef) {
      Alert.alert('Error', 'Please enter an Instagram URL.');
      setIsLoading(false);
      return;
    }

    const url = `https://instagram-downloader-download-photo-video-reels-igtv.p.rapidapi.com/data?url=${encodeURIComponent(inputUrlRef)}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '330bd3a207msha6fc49657d8bda1p1b4f6cjsn53a87fa57180',
        'x-rapidapi-host': 'instagram-downloader-download-photo-video-reels-igtv.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      console.log('API Response:', result);

      if (result && result.data.result && result.data.result.video_url) {
        const videoUrl = result.data.result.video_url;
        console.log('Navigating to VideoScreen with URL:', videoUrl);
        navigation.navigate('VideoScreen', { videoUrl: videoUrl, source: 'Instagram' });
      } else {
        Alert.alert('Error', 'Instagram URL not found.');
        console.log("Instagram URL not found");
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch video. Please check the URL and try again.');
      console.error(error);
    }

    setIsLoading(false);
    setInputUrlRef("");
  };

  return (
    <View style={{ flex: 1 }}>
      <Image source={require("../assets/back.png")} resizeMode="cover" style={styles.back}/>
        <View style={styles.container}>
            <Text style={styles.title}>Instagram Video Downloader</Text>
            <View style={styles.linkContainer}>
            <TextInput
              style={styles.input}
              placeholder="Paste Instagram Video Link..."
              keyboardType="url"
              value={inputUrlRef}
              onChangeText={setInputUrlRef}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={{ textAlign: 'center', fontSize: 16, color: 'black', fontWeight: 'bold' }}>Let's Go</Text>
            </TouchableOpacity>
            </View>
          <View style={styles.imageSection}>
            <Image
              source={require("../assets/logo.png")}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
        </View>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <WaveIndicator color="#EA6FB2" />
          <Text style={styles.loadingText}>Downloading...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    paddingLeft: 20,
    color: 'black',
    textAlign: 'left',
    shadowColor: 'rgba(113, 118, 244, 1)',
    shadowOpacity: 1,
    elevation: 1,
    shadowRadius: 50.1,
    shadowOffset: { width: 1, height: 3 },
  },
  back:{
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  input: {
    width: "90%",
    height: 50,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 17,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 16,
  },
  button: {
    backgroundColor: "#68D2A4",
    borderWidth: 2,
    justifyContent: 'center',
    borderRadius: 17,
    marginBottom: 10,
    width: '90%',
    height: 50,
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOpacity: 1,
    elevation: 1,
    shadowRadius: 0.1,
    shadowOffset: { width: 4, height: 5 },
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Optional: to dim the background
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    position: 'absolute',
    paddingTop: 70,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  linkContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  imageSection: {
    width: "100%",
    height: 220,
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center'
  },
});

export default Instagram;
