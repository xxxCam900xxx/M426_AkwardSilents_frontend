import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
const image = require('../Pictures/HomeH.jpg');

const HomePage = () => {
  const navigation = useNavigation();

  const navigateButton = () => {
    navigation.navigate('Navbar');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="contain" style={styles.image}></ImageBackground>

      <View style={styles.centeredContainer}>
        <Text style={styles.largeText}>Call Your Friends Simply And Simple With AkwardSilents</Text>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.text}>It’s easy to talk to your friends with AkwardSilents</Text>
        <TouchableOpacity style={styles.button} onPress={navigateButton}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
  centeredContainer: {
    position: 'absolute',
    top: '50%',
    alignItems: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  largeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomePage;