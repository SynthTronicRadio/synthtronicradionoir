
import { View, Text, ScrollView } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../../styles/commonStyles';
import { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

interface CurrentSong {
  title: string;
  artist: string;
  album?: string;
  duration: string;
  currentTime: string;
}

export default function NowPlayingScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSong, setCurrentSong] = useState<CurrentSong>({
    title: "Summer Vibes",
    artist: "Radio Station Mix",
    album: "Live Session",
    duration: "3:45",
    currentTime: "1:23"
  });

  const [listeners, setListeners] = useState(1247);

  useEffect(() => {
    // Simulate live listener count updates
    const interval = setInterval(() => {
      setListeners(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

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
    } finally {
      setIsLoading(false);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    console.log('Volume changed to:', newVolume);
  };

  console.log('Now Playing screen rendered with current song:', currentSong.title);

  return (
    <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
      <View style={commonStyles.content}>
        {/* Header */}
        <View style={[commonStyles.section, { marginTop: 40 }]}>
          <Text style={commonStyles.title}>Now Playing</Text>
          <Text style={commonStyles.textSecondary}>
            {listeners.toLocaleString()} listeners • Live
          </Text>
        </View>

        {/* Album Art / Station Logo */}
        <View style={[commonStyles.nowPlayingCard, { marginTop: 40 }]}>
          <View style={{
            width: 200,
            height: 200,
            backgroundColor: colors.primary,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 32,
            boxShadow: `0px 8px 24px ${colors.shadow}`,
            elevation: 12,
          }}>
            <Icon name="musical-notes" size={80} color="white" />
          </View>

          {/* Song Info */}
          <Text style={[commonStyles.subtitle, { color: colors.primary, marginBottom: 8, textAlign: 'center' }]}>
            {currentSong.title}
          </Text>
          <Text style={[commonStyles.text, { marginBottom: 4, textAlign: 'center' }]}>
            {currentSong.artist}
          </Text>
          {currentSong.album && (
            <Text style={[commonStyles.textSecondary, { marginBottom: 24, textAlign: 'center' }]}>
              {currentSong.album}
            </Text>
          )}

          {/* Progress Bar */}
          <View style={{ width: '100%', marginBottom: 8 }}>
            <View style={{
              height: 4,
              backgroundColor: colors.border,
              borderRadius: 2,
              marginBottom: 8,
            }}>
              <View style={{
                height: 4,
                backgroundColor: colors.primary,
                borderRadius: 2,
                width: '37%', // Simulated progress
              }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
                {currentSong.currentTime}
              </Text>
              <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
                {currentSong.duration}
              </Text>
            </View>
          </View>

          {/* Control Buttons */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 24 }}>
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: colors.backgroundAlt,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 16,
              }}
              onPress={() => console.log('Previous track')}
            >
              <Icon name="play-skip-back" size={24} color={colors.text} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[buttonStyles.playButton, { 
                backgroundColor: isLoading ? colors.textSecondary : (isPlaying ? colors.error : colors.primary),
                width: 70,
                height: 70,
                borderRadius: 35,
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

            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: colors.backgroundAlt,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 16,
              }}
              onPress={() => console.log('Next track')}
            >
              <Icon name="play-skip-forward" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Live indicator */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 24,
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: colors.error,
            borderRadius: 20,
          }}>
            <View style={{
              width: 8,
              height: 8,
              backgroundColor: 'white',
              borderRadius: 4,
              marginRight: 8,
            }} />
            <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>
              LIVE RADIO
            </Text>
          </View>
        </View>

        {/* Volume Control */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.subtitle, { marginBottom: 20 }]}>Volume</Text>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Icon name="volume-low" size={20} color={colors.textSecondary} />
            <View style={{ flex: 1, marginHorizontal: 16 }}>
              <View style={{
                height: 6,
                backgroundColor: colors.border,
                borderRadius: 3,
                position: 'relative',
              }}>
                <View style={{
                  height: 6,
                  backgroundColor: colors.primary,
                  borderRadius: 3,
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

        {/* Station Info */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>Station Info</Text>
          
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
