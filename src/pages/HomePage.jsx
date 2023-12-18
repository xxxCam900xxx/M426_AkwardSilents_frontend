import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const image = require('../Pictures/HomeH.jpg');

const HomePage = () => {
  const navigation = useNavigation();

  const navigateToRegister = () => {
    navigation.navigate('RegisterPage'); 
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="contain" style={styles.image}></ImageBackground>

      <View style={styles.bottomContainer}>
        <Text style={styles.largeText}>It’s easy to talk to your friends with AkwardSilents</Text>
        <Text style={styles.text}>Call Your Friends Simply And Simple With AkwardSilents</Text>
        <TouchableOpacity style={styles.button} onPress={navigateToRegister}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    top: 25,
    flex: 1,
    width: 1000,
    height: '50%',
    justifyContent: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
  largeText: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 45,
  },
  text: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#006400',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
  },
  buttonText: {
    color: '#E1D9D1',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default HomePage;
