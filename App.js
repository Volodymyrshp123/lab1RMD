import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import GalleryScreen from './screens/GalleryScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function AppHeader() {
  return (
    <View style={styles.header}>
      <Image source={require('./assets/image.png')} style={styles.logoImage} />
      <Text style={styles.appTitle}>FirstMobileApp</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.appContainer}>
        <AppHeader />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#1565C0',
            tabBarInactiveTintColor: '#9E9E9E',
            tabBarStyle: {
              backgroundColor: '#fff',
              borderTopColor: '#E0E0E0',
              height: 60,
              paddingBottom: 8,
            },
            tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
            tabBarIcon: ({ focused, color, size }) => {
              const icons = {
                'Головна': '🏠',
                'Фотогалерея': '📸',
                'Профіль': '👤',
              };
              return <Text style={{ fontSize: 20 }}>{icons[route.name]}</Text>;
            },
          })}
        >
          <Tab.Screen name="Головна" component={HomeScreen} />
          <Tab.Screen name="Фотогалерея" component={GalleryScreen} />
          <Tab.Screen name="Профіль" component={ProfileScreen} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    elevation: 4,
  },
  logoImage: { width: 140, height: 40, borderRadius: 0 },
  appTitle: { fontSize: 18, fontWeight: '700', color: '#212121' },
});
