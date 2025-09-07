
import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/commonStyles';

const { width, height } = Dimensions.get('window');

export default function ContactScreen() {
  console.log('Contact screen rendered with metallic brushed steel icon styling');

  const handleSocialLink = async (url: string) => {
    try {
      console.log('Opening social media link:', url);
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening link:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/07aab9fc-1fad-42d2-942c-9f1894ba0d10.jpeg')}
        style={styles.image}
        resizeMode="contain"
      />
      
      <View style={styles.socialContainer}>
        <TouchableOpacity 
          style={styles.socialButton}
          onPress={() => handleSocialLink('https://www.tiktok.com/@synthtronic.radio')}
        >
          <Ionicons name="logo-tiktok" size={40} color="#E8E8E8" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.socialButton}
          onPress={() => handleSocialLink('https://www.instagram.com/synthtronicradio')}
        >
          <Ionicons name="logo-instagram" size={40} color="#E8E8E8" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.socialButton}
          onPress={() => handleSocialLink('https://www.facebook.com/synthtronicradio')}
        >
          <Ionicons name="logo-facebook" size={40} color="#E8E8E8" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.8,
    height: height * 0.6,
    marginBottom: 40,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
    paddingHorizontal: 20,
  },
  socialButton: {
    padding: 15,
    borderRadius: 50,
    backgroundColor: '#B8B8B8', // Brushed steel base color
    borderWidth: 3,
    borderColor: '#A0A0A0', // Darker steel border
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4), inset 0px 2px 4px rgba(255, 255, 255, 0.3), inset 0px -2px 4px rgba(0, 0, 0, 0.2)', // Multiple shadows for metallic effect
    elevation: 12,
    // Additional metallic styling
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
});
