import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import * as SecureStore from 'expo-secure-store';

const countries = [
  { code: '+40', name: 'Rumänien', flag: require('../Pictures/flaggen/Flag_of_Romania.svg.webp') },
  { code: '+49', name: 'Deutschland', flag: require('../Pictures/flaggen/Flag_of_Germany.svg.webp') },
  { code: '+41', name: 'Schweiz', flag: require('../Pictures/flaggen/Flag_of_Switzerland.svg.webp') },
  { code: '+4175', name: 'Liechtenstein', flag: require('../Pictures/flaggen/Flag_of_Liechtenstein.svg.webp') },
  { code: '+420', name: 'Tschechien', flag: require('../Pictures/flaggen/Flag_of_the_Czech_Republic.svg.webp') },
  { code: '+421', name: 'Slowakei', flag: require('../Pictures/flaggen/Flag_of_Slovakia.svg.webp') },
];

const CountryCodePicker = ({ selectedCode, onPress }) => (
  <TouchableOpacity style={styles.countryCodePicker} onPress={onPress}>
    <Text style={styles.countryCodeText}>{selectedCode}</Text>
  </TouchableOpacity>
);

const CountryPickerModal = ({ visible, onSelect, onClose }) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.modalContainer}>
      <FlatList
        data={countries}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.countryItem} onPress={() => onSelect(item)}>
            <Image source={item.flag} style={styles.countryFlag} />
            <Text style={styles.countryName}>{`${item.name} (${item.code})`}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Schließen</Text>
      </TouchableOpacity>
    </View>
  </Modal>
);

const RegisterPage = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCountryCodePress = () => {
    setModalVisible(true);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setModalVisible(false);
  };

  const handleRegister = async () => {
    if (!phoneNumber || !userName || !hobbies) {
      return;
    }

    const registrationData = {
      phoneNumber,
      userName,
      hobbies,
      country: selectedCountry,
    };
    try {
      await SecureStore.setItem('userData', JSON.stringify(registrationData));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
    navigation.navigate('Navbar');
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrieren</Text>

      <TextInput
        style={styles.input}
        placeholder="Benutzername"
        value={userName}
        onChangeText={setUserName}
        placeholderTextColor="gray"
      />

      <TextInput
        style={styles.input}
        placeholder="Hobbys"
        value={hobbies}
        onChangeText={setHobbies}
        placeholderTextColor="gray"
      />

      <View style={styles.phoneInputContainer}>
        <CountryCodePicker selectedCode={selectedCountry.code} onPress={handleCountryCodePress} />
        <TextInput
          style={styles.phoneInput}
          placeholder="Telefonnummer eingeben"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          placeholderTextColor="gray"
        />
      </View>

      <CountryPickerModal visible={modalVisible} onSelect={handleCountrySelect} onClose={handleCloseModal} />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrieren</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    padding: 20,
  },
  countryFlag: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    paddingTop: 51,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  countryCodePicker: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  countryCodeText: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    marginBottom: 15,
    paddingHorizontal: 10,
    color: 'black', // Text color
  },
  phoneInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    color: 'black', // Text color
  },
  button: {
    backgroundColor: '#006400',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#E1D9D1',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    paddingTop: 51,
    paddingBottom: 51,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  countryName: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#006400',
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#E1D9D1',
    fontSize: 16,
  },
});

export default RegisterPage;
