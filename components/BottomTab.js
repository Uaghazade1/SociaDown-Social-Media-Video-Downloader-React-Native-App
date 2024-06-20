import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import YoutubeToMP4 from './Youtube-to-mp4';
import TikTok from './TikTok';
import Instagram from './Instagram';
import Twitter from './Twitter';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = Platform.OS !== 'web' ? 'heart' : 'md-home';
          } else if (route.name === 'Youtube Video Downloader') {
            iconName = 'logo-youtube';
          } else if (route.name === 'Instagram Video Downloader') {
            iconName = 'logo-instagram';
          } else if (route.name === 'TikTok Video Downloader') {
            iconName = 'logo-tiktok';
          } else if (route.name === 'Twitter Video Downloader') {
            iconName = 'logo-twitter';
          }
          return (
            <View style={styles.iconContainer}>
              <Icon name={iconName} color={color} size={size} />
              {focused && <View style={styles.dot} />}
            </View>
          );
        },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          bottom: 20,
          elevation: 0, // For Android
          shadowOpacity: 0, // For iOS
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        keyboardHidesTabBar: true,
      })}
    >
      <Tab.Screen
        name="Youtube Video Downloader"
        component={YoutubeToMP4}
        options={{ headerShown: false, tabBarShowLabel: false }}
      />
      <Tab.Screen
        name="TikTok Video Downloader"
        component={TikTok}
        options={{ headerShown: false, tabBarShowLabel: false }}
      />
      <Tab.Screen
        name="Instagram Video Downloader"
        component={Instagram}
        options={{ headerShown: false, tabBarShowLabel: false }}
      />
      <Tab.Screen
        name="Twitter Video Downloader"
        component={Twitter}
        options={{ headerShown: false, tabBarShowLabel: false }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 20,
    height: 2,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: -10,
  },
});

export default BottomTab;
