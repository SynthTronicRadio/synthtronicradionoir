
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function ContactScreen() {
  console.log('Contact screen rendered with black background and centered image');

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/995a9a2b-5b10-4549-aaff-88cf5d0185ac.jpeg')}
        style={styles.image}
        resizeMode="contain"
      />
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
    width: '90%',
    height: '90%',
  },
});
