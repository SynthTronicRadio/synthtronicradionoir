
import { View, Text, ScrollView, Alert } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../../styles/commonStyles';
import { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function ListenScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlayPause = async () => {
    console.log('Play/Pause button pressed, current state:', isPlaying);
    setIsLoading(true);
    
    try {
      // Simulate loading time for audio stream
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isPlaying) {
        // Stop audio
        setIsPlaying(false);
        console.log('Audio stopped');
      } else {
        // Start audio
        setIsPlaying(true);
        console.log('Audio started');
      }
    } catch (error) {
      console.log('Error handling audio:', error);
      Alert.alert('Error', 'Unable to connect to the radio stream. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    console.log('Volume changed to:', newVolume);
  };

  return (
    <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
      <View style={commonStyles.content}>
        {/* Header */}
        <View style={[commonStyles.section, { marginTop: 40 }]}>
          <Text style={commonStyles.title}>Listen Live</Text>
          <Text style={commonStyles.textSecondary}>High quality audio stream</Text>
        </View>

        {/* Main Player */}
        <View style={[commonStyles.nowPlayingCard, { marginTop: 40 }]}>
          {/* Station Logo */}
          <View style={{
            width: 100,
            height: 100,
            backgroundColor: colors.primary,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
            boxShadow: `0px 4px 16px ${colors.shadow}`,
            elevation: 8,
          }}>
            <Icon name="radio" size={50} color="white" />
          </View>

          {/* Current Track Info */}
          <Text style={[commonStyles.textSecondary, { marginBottom: 8 }]}>NOW PLAYING</Text>
          <Text style={[commonStyles.subtitle, { color: colors.primary, marginBottom: 4 }]}>
            Summer Vibes Mix
          </Text>
          <Text style={[commonStyles.text, { marginBottom: 20 }]}>
            Your Radio Station
          </Text>

          {/* Play/Pause Button */}
          <TouchableOpacity
            style={[buttonStyles.playButton, { 
              backgroundColor: isLoading ? colors.textSecondary : (isPlaying ? colors.error : colors.primary)
            }]}
            onPress={handlePlayPause}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <Icon name="hourglass" size={32} color="white" />
            ) : (
              <Icon name={isPlaying ? "pause" : "play"} size={32} color="white" />
            )}
          </TouchableOpacity>

          <Text style={[commonStyles.textSecondary, { marginTop: 16 }]}>
            {isLoading ? 'Connecting...' : (isPlaying ? 'Now Playing' : 'Tap to Play')}
          </Text>
        </View>

        {/* Volume Control */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.subtitle, { marginBottom: 20 }]}>Volume Control</Text>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Icon name="volume-low" size={20} color={colors.textSecondary} />
            <View style={{ flex: 1, marginHorizontal: 16 }}>
              <View style={{
                height: 4,
                backgroundColor: colors.border,
                borderRadius: 2,
                position: 'relative',
              }}>
                <View style={{
                  height: 4,
                  backgroundColor: colors.primary,
                  borderRadius: 2,
                  width: `${volume * 100}%`,
                }} />
              </View>
            </View>
            <Icon name="volume-high" size={20} color={colors.textSecondary} />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button
              text="25%"
              onPress={() => handleVolumeChange(0.25)}
              style={[buttonStyles.secondary, { width: '22%', padding: 8 }]}
            />
            <Button
              text="50%"
              onPress={() => handleVolumeChange(0.5)}
              style={[buttonStyles.secondary, { width: '22%', padding: 8 }]}
            />
            <Button
              text="75%"
              onPress={() => handleVolumeChange(0.75)}
              style={[buttonStyles.secondary, { width: '22%', padding: 8 }]}
            />
            <Button
              text="100%"
              onPress={() => handleVolumeChange(1.0)}
              style={[buttonStyles.secondary, { width: '22%', padding: 8 }]}
            />
          </View>
        </View>

        {/* Stream Info */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>Stream Information</Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={commonStyles.textSecondary}>Quality:</Text>
            <Text style={commonStyles.text}>320 kbps</Text>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={commonStyles.textSecondary}>Format:</Text>
            <Text style={commonStyles.text}>MP3</Text>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={commonStyles.textSecondary}>Status:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                width: 8,
                height: 8,
                backgroundColor: isPlaying ? colors.success : colors.textSecondary,
                borderRadius: 4,
                marginRight: 8,
              }} />
              <Text style={commonStyles.text}>
                {isPlaying ? 'Connected' : 'Disconnected'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
