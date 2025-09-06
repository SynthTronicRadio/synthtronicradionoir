
import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function ContactScreen() {
  console.log('Contact screen rendered with new SynthTronic Radio Noir image');

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/07aab9fc-1fad-42d2-942c-9f1894ba0d10.jpeg')}
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
    width: width * 0.9,
    height: height * 0.9,
  },
});
